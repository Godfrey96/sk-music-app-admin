import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Album } from 'src/app/_models/album.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  apiUrlAlbums = environment.apiURL + 'albums';

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrlAlbums}`);
  }

  // add new category
  addNewAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrlAlbums, album);
  }

  // get album artist
  getSingleAlbum(albumId: any): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrlAlbums}/${albumId}`);
  }

  // get albums count
  getAlbumsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlAlbums}/get/count`)
      .pipe(map((objectValue: any) => objectValue.albumCount));
  }
}
