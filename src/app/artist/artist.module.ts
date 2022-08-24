import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistListComponent } from './artist-list/artist-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';


const UX_MODULE = [
  ButtonModule,
  TableModule,
  PaginatorModule,
  CardModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  ConfirmDialogModule,
  FieldsetModule,
]

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistFormComponent,
    ArtistListComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    [...UX_MODULE]
  ]
})
export class ArtistModule { }
