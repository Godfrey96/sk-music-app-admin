import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/_models/song.model';
import { SongsService } from 'src/app/_services/songs/songs.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  song!: Song;
  songId: any;

  constructor(
    private songsService: SongsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this._getSong();
  }

  private _getSong() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.songsService.getSingleSong(params['id']).subscribe(song => {
          this.song = song;
          console.log('song: ', song)
        })
      }
    });
  }

  onCancle() {
    this.location.back();
  }

}
