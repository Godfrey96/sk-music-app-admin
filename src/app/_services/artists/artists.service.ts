import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artist } from 'src/app/_models/artist.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  apiUrlArtists = environment.apiURL + 'artists';

  constructor(private http: HttpClient) { }

  // get all artists
  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrlArtists}`);
  }

  // add new artist
  addNewArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrlArtists, artist);
  }

  // get single artist
  getSingleArtist(artistId: any): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrlArtists}/${artistId}`);
  }

  // get artists count
  getArtistsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlArtists}/get/count`)
      .pipe(map((objectValue: any) => objectValue.artistCount));
  }
}
