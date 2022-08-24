import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Artist } from 'src/app/_models/artist.model';
import { ArtistsService } from 'src/app/_services/artists/artists.service';
import { SongsService } from 'src/app/_services/songs/songs.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/_models/song.model';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  id: any;
  searchCategory!: any;
  artistSongs: Song[] = [];
  artist!: Artist;

  constructor(
    private artistsService: ArtistsService,
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
    this._getSongByArtist();
    this._getSingleArtist();
  }

  private _getSongByArtist() {
    this.songsservice.getSongByArtist(this.searchCategory).subscribe({
      next: (artistData: any) => {
        this.artistSongs = artistData;
        console.log('artists: ', artistData);
      },
      error: (err: any) => {
        console.log('Failed');
      }
    });
  }

  private _getSingleArtist() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.artistsService.getSingleArtist(params['id']).subscribe(artist => {
          this.artist = artist;
          console.log('artist: ', artist)
        })
      }
    });
  }

  onCancle() {
    this.location.back();
  }


}
