import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { Album } from 'src/app/_models/album.model';
import { AlbumsService } from 'src/app/_services/albums/albums.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Artist } from 'src/app/_models/artist.model';
import { ArtistsService } from 'src/app/_services/artists/artists.service';

@Component({
  selector: 'app-albums-form',
  templateUrl: './albums-form.component.html',
  styleUrls: ['./albums-form.component.css']
})
export class AlbumsFormComponent implements OnInit, OnDestroy {

  albumForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;
  editmode = false;
  actionBtn: string = 'Save';
  titleForm: string = "Add"
  imageDisplay: any;
  currentAlbumId!: string;

  endsub$: Subject<any> = new Subject();
  artists: Artist[] = [];

  constructor(
    private fb: FormBuilder,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this._initCategoryForm();
    this._checkEditMode();
    this._getArtists()
  }

  // form
  _initCategoryForm() {
    this.albumForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      // artist: ['', Validators.required],
      // songs: ['', Validators.required],
    });
  }

  // get all artists
  private _getArtists() {
    this.artistsService.getAllArtists().pipe(
      takeUntil(this.endsub$)).subscribe((artists) => {
        this.artists = artists;
        console.log('artists: ', artists);
      });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentAlbumId = params['id'];
        this.albumsService.getSingleAlbum(params['id']).subscribe(album => {
          this.albumFormError['name'].setValue(album.name);
          this.imageDisplay = album.image;
          this.albumFormError['image'].setValidators([]);
          this.albumFormError['image'].updateValueAndValidity();
        })
      }
    })
  }

  onImageUpload(event: any) {
    console.log(event);
    const files = event.target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) return;
    const file = files[0];
    const filePath = 'albums/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe((url: any) => {
          console.log('url: ', url);
          if (url) {
            this.imageDisplay = url;
          }
        });
      })
    ).subscribe(url => {
      console.log('data: ', url);
    });
  }


  // add/create album
  private addAlbum(album: Album) {
    this.albumsService.addNewAlbum(album).subscribe((album: Album) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Album ${album.name} is created`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Album is not created'
        });
      });
  }

  onSubmit() {
    this.isSubmitted = true;

    const album: Album = {
      name: this.albumFormError['name'].value,
      // artist: this.albumFormError['artist'].value,
      image: this.imageDisplay
    }

    console.log('album: ', album)

    if (this.editmode) {
      console.log('Update function not implemented yet!')
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Update function not implemented yet!'
      });
      // this._updateRoom(room);
    } else {
      this.addAlbum(album);
    }

    // this.addAlbum(album);
  }

  onCancle() {
    this.location.back();
  }

  // errors
  get albumFormError() {
    return this.albumForm.controls;
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}
