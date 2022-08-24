import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistComponent } from './artist.component';

const routes: Routes = [
  { path: '', component: ArtistListComponent },
  { path: 'artists', component: ArtistListComponent },
  { path: 'form', component: ArtistFormComponent },
  // { path: 'form/:id', component: ArtistFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
