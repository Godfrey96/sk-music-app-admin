import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { SongDetailsComponent } from './song-details/song-details.component';
import { SongComponent } from './song.component';
import { SongsFormComponent } from './songs-form/songs-form.component';
import { SongsListComponent } from './songs-list/songs-list.component';

const routes: Routes = [
  { path: '', component: SongsListComponent },
  { path: 'songs', component: SongsListComponent },
  { path: 'form', component: SongsFormComponent },
  // { path: 'form/:id', component: SongsFormComponent }
  { path: 'form/:id', component: SongDetailsComponent },
  { path: 'get/song-by-artist/:id', component: ArtistDetailsComponent },
  { path: 'get/song-by-album/:id', component: AlbumDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
