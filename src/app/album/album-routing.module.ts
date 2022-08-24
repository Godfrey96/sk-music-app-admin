import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';
import { AlbumsFormComponent } from './albums-form/albums-form.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent },
  { path: 'albums', component: AlbumsListComponent },
  { path: 'form', component: AlbumsFormComponent },
  { path: 'form/:id', component: AlbumsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
