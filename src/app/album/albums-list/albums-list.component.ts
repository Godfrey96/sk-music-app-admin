import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Album } from 'src/app/_models/album.model';
import { AlbumsService } from 'src/app/_services/albums/albums.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  albums: Album[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(
    private albumService: AlbumsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._getAlbums();
  }

  private _getAlbums() {
    this.albumService.getAllAlbums().pipe(
      takeUntil(this.endsub$)).subscribe((albums) => {
        this.albums = albums;
        console.log('albums: ', albums);
      });
  }

  viewAlbum(albumId: string) {
    this.router.navigateByUrl(`/songs/get/song-by-album/${albumId}`)
  }

  ngOnDestroy() {
    this.endsub$.next('');
    this.endsub$.complete();
  }

}
