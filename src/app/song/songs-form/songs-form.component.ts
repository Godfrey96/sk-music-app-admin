import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SongsService } from 'src/app/_services/songs/songs.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, Subject, takeUntil, timer } from 'rxjs';
import { Song } from 'src/app/_models/song.model';
import { AlbumsService } from 'src/app/_services/albums/albums.service';
import { ArtistsService } from 'src/app/_services/artists/artists.service';
import { Artist } from 'src/app/_models/artist.model';
import { Album } from 'src/app/_models/album.model';

@Component({
  selector: 'app-songs-form',
  templateUrl: './songs-form.component.html',
  styleUrls: ['./songs-form.component.css']
})
export class SongsFormComponent implements OnInit, OnDestroy {

  songForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;
  editmode = false;
  actionBtn: string = 'Save';
  titleForm: string = "Add"
  imageDisplay: any;
  audioDisplay: any;
  currentAlbumId!: string;

  uploadImage!: any;
  uploadAudio!: any;

  albums: Album[] = [];
  artists: Artist[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private songService: SongsService,
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
    this._getAlbums();
    this._getArtists();
  }

  // get all albums
  private _getAlbums() {
    this.albumsService.getAllAlbums().pipe(
      takeUntil(this.endsub$)).subscribe((albums) => {
        this.albums = albums;
        console.log('albums: ', albums);
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

  // form
  _initCategoryForm() {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      uploadedDate: ['', Validators.required],
      isFeatured: [false],
      audio: ['', Validators.required],
      image: ['', Validators.required],
      album: ['', Validators.required],
      artist: ['', Validators.required],
    });
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.editmode = true;
        this.currentAlbumId = params['id'];
        this.songService.getSingleSong(params['id']).subscribe((song: any) => {
          this.songFormError['title'].setValue(song.title);
          this.songFormError['uploadedDate'].setValue(song.uploadedDate);
          this.songFormError['isFeatured'].setValue(song.isFeatured);
          this.songFormError['audio'].setValue(song.audio);
          this.songFormError['album'].setValue(song.album?.id);
          this.songFormError['artist'].setValue(song.artist?.id);
          this.imageDisplay = song.image;
          this.songFormError['image'].setValidators([]);
          this.songFormError['image'].updateValueAndValidity();
        })
      }
    })
  }

  onAudioUpload(event: any) {
    console.log(event);
    const files = event.target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) === null) return;
    const file = files[0];
    const filePath = 'songs/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadAudio = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe((url: any) => {
          console.log('url: ', url);
          if (url) {
            this.audioDisplay = url;
          }
        });
      })
    ).subscribe(url => {
      console.log('audio: ', url);
    });
  }

  onImageUpload(event: any) {
    console.log(event);
    const files = event.target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) return;
    const file = files[0];
    const filePath = 'songscover/' + Date.now() + '_' + file.name;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadImage = task.percentageChanges();
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
  private addSong(song: Song) {
    this.songService.addNewSong(song).subscribe((song: Song) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Song ${song.title} is created`
      });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Song is not created'
        });
      });
  }

  onSubmit() {
    this.isSubmitted = true;

    const song: Song = {
      title: this.songFormError['title'].value,
      uploadedDate: this.songFormError['uploadedDate'].value,
      isFeatured: this.songFormError['isFeatured'].value,
      album: this.songFormError['album'].value,
      artist: this.songFormError['artist'].value,
      audio: this.audioDisplay,
      image: this.imageDisplay
    }

    console.log('song: ', song)

    if (this.editmode) {
      console.log('Update function not implemented yet!')
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Update function not implemented yet!'
      });
      // this._updateRoom(room);
    } else {
      this.addSong(song);
    }
  }

  onCancle() {
    this.location.back();
  }

  // errors
  get songFormError() {
    return this.songForm.controls;
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}
