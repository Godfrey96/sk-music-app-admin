import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'albums', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) },
      { path: 'songs', loadChildren: () => import('./song/song.module').then(m => m.SongModule) },
      { path: 'artists', loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule) },
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
