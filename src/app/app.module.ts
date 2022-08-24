import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


const UX_MODULE = [
  ButtonModule,
  TableModule,
  PaginatorModule,
  CardModule,
  ToastModule
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SongModule,
    ArtistModule,
    AlbumModule,
    ...UX_MODULE,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
