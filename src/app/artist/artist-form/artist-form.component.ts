import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ArtistsService } from 'src/app/_services/artists/artists.service';
import { Location } from '@angular/common';
import { finalize, timer } from 'rxjs';
import { Artist } from 'src/app/_models/artist.model';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit {

  artistForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;
  editmode = false;
  actionBtn: string = 'Save';
  titleForm: string = "Add"
  imageDisplay: any;
  currentArtistId!: string;

  constructor(
    private fb: FormBuilder,
    private artistsService: ArtistsService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this._initCategoryForm();
    this._checkEditMode();
  }

  // form
  _initCategoryForm() {
    this.artistForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      // songs: ['', Validators.required],
    });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentArtistId = params['id'];
        this.artistsService.getSingleArtist(params['id']).subscribe(artist => {
          this.artistFormError['name'].setValue(artist.name);
          this.artistFormError['gender'].setValue(artist.gender);
          this.imageDisplay = artist.image;
          this.artistFormError['image'].setValidators([]);
          this.artistFormError['image'].updateValueAndValidity();
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
    const filePath = 'artists/' + Date.now() + '_' + file.name;
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
  private addArtist(artist: Artist) {
    this.artistsService.addNewArtist(artist).subscribe((artist: Artist) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Artist ${artist?.name} is added`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Artist is not added'
        });
      });
  }

  onSubmit() {
    this.isSubmitted = true;

    const artist: Artist = {
      name: this.artistFormError['name'].value,
      gender: this.artistFormError['gender'].value,
      image: this.imageDisplay
    }

    console.log('artist: ', artist)

    if (this.editmode) {
      console.log('Update function not implemented yet!')
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Update function not implemented yet!'
      });
      // this._updateRoom(room);
    } else {
      this.addArtist(artist);
    }

    // this.addAlbum(album);
  }

  onCancle() {
    this.location.back();
  }

  // errors
  get artistFormError() {
    return this.artistForm.controls;
  }

}
