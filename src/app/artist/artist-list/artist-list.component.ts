import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Artist } from 'src/app/_models/artist.model';
import { ArtistsService } from 'src/app/_services/artists/artists.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit, OnDestroy {

  artists: Artist[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private artistsService: ArtistsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getAlbums();
  }

  private _getAlbums() {
    this.artistsService.getAllArtists().pipe(
      takeUntil(this.endsub$)).subscribe((artists) => {
        this.artists = artists;
        console.log('artists: ', artists);
      });
  }

  viewAlbum(artistId: string) {
    this.router.navigateByUrl(`/songs/get/song-by-artist/${artistId}`)
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }
}
