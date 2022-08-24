import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Song } from 'src/app/_models/song.model';
import { SongsService } from 'src/app/_services/songs/songs.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit, OnDestroy {

  songs: Song[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private songsService: SongsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getSongs();
  }

  private _getSongs() {
    this.songsService.getAllSongs().subscribe((songs) => {
      this.songs = songs;
      console.log('songs: ', songs);
    });
  }

  // private _getSongs() {
  //   this.songsService.getAllSongs().pipe(
  //     takeUntil(this.endsub$)).subscribe((songs) => {
  //       this.songs = songs;
  //       console.log('songs: ', songs);
  //     });
  // }

  viewSong(songId: string) {
    this.router.navigateByUrl(`songs/form/${songId}`)
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}
