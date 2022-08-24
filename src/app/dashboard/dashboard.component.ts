import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../_services/albums/albums.service';
import { ArtistsService } from '../_services/artists/artists.service';
import { SongsService } from '../_services/songs/songs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  artistsCount = 0;
  albumsCount = 0;
  songsCount = 0;

  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private songsService: SongsService
  ) { }

  ngOnInit(): void {
    this._getArtistsCount();
    this._getAlbumsCount();
    this._getSongsCount();
  }

  private _getArtistsCount() {
    this.artistsService.getArtistsCount().subscribe(artistCount => {
      this.artistsCount = artistCount;
    })
  }

  private _getAlbumsCount() {
    this.albumsService.getAlbumsCount().subscribe(albumCount => {
      this.albumsCount = albumCount;
    })
  }

  private _getSongsCount() {
    this.songsService.getSongsCount().subscribe(songCount => {
      this.songsCount = songCount;
    })
  }

}
