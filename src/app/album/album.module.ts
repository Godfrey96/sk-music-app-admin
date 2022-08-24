import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { AlbumsFormComponent } from './albums-form/albums-form.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const UX_MODULE = [
  ButtonModule,
  TableModule,
  PaginatorModule,
  CardModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  ConfirmDialogModule,
]

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumsFormComponent,
    AlbumsListComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    [...UX_MODULE]
  ]
})
export class AlbumModule { }
