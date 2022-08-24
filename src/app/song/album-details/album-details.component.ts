import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/_models/album.model';
import { Song } from 'src/app/_models/song.model';
import { AlbumsService } from 'src/app/_services/albums/albums.service';
import { SongsService } from 'src/app/_services/songs/songs.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  id: any;
  searchCategory!: any;
  songs: Song[] = [];
  album!: Album;

  constructor(
    private albumsService: AlbumsService,
    private songsservice: SongsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('checking-id: ', id);
    if (id) {
      this.searchCategory = id;
    }
    this._getSongByAlbum();
    this._getSingleAlbum();
  }

  private _getSongByAlbum() {
    this.songsservice.getSongByAlbum(this.searchCategory).subscribe({
      next: (albumData: any) => {
        this.songs = albumData;
        console.log('songs: ', albumData);
      },
      error: (err: any) => {
        console.log('Failed');
      }
    });
  }

  private _getSingleAlbum() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.albumsService.getSingleAlbum(params['id']).subscribe(album => {
          this.album = album;
          console.log('album: ', album)
        })
      }
    });
  }

  onCancle() {
    this.location.back();
  }

}
