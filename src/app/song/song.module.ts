import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongRoutingModule } from './song-routing.module';
import { SongComponent } from './song.component';
import { SongsFormComponent } from './songs-form/songs-form.component';
import { SongsListComponent } from './songs-list/songs-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FieldsetModule } from 'primeng/fieldset';


import { SongDetailsComponent } from './song-details/song-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const UX_MODULE = [
  ButtonModule,
  TableModule,
  PaginatorModule,
  CardModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  ConfirmDialogModule,
  CalendarModule,
  InputSwitchModule,
  FieldsetModule,
]

@NgModule({
  declarations: [
    SongComponent,
    SongsFormComponent,
    SongsListComponent,
    SongDetailsComponent,
    ArtistDetailsComponent,
    AlbumDetailsComponent
  ],
  imports: [
    CommonModule,
    SongRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    [...UX_MODULE]
  ]
})
export class SongModule { }
