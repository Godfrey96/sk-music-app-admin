import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Song } from 'src/app/_models/song.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  apiUrlSongs = environment.apiURL + 'songs';

  constructor(private http: HttpClient) { }

  // add new artist
  addNewSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrlSongs, song);
  }

  getAllSongs(artistsFilter?: any[], albumsFilter?: any[]): Observable<Song[]> {
    let params = new HttpParams();
    if (artistsFilter) {
      params = params.append('artists', artistsFilter.join(','));
    }
    if (albumsFilter) {
      params = params.append('artists', albumsFilter.join(','));
    }
    return this.http.get<Song[]>(this.apiUrlSongs, { params: params });
  }

  getAllFeaturedSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrlSongs}/featuredsongs`);
  }

  getAllNewSongs(artistsFilter?: any[], albumsFilter?: any[]): Observable<Song[]> {
    let params = new HttpParams();
    if (artistsFilter) {
      params = params.append('artists', artistsFilter.join(','));
    }
    if (albumsFilter) {
      params = params.append('artists', albumsFilter.join(','));
    }
    return this.http.get<Song[]>(`${this.apiUrlSongs}/newsongs`, { params: params });
  }

  // get single artist
  getSingleSong(songId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/${songId}`);
  }

  // search songs
  searchSongs(data: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/searchsongs?query=` + data);
  }

  // get song by artist
  getSongByArtist(artistId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/get/song-by-artist/${artistId}`);
  }

  // get song by album
  getSongByAlbum(albumId: any): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrlSongs}/get/song-by-album/${albumId}`);
  }

  // get songs count
  getSongsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlSongs}/get/count`)
      .pipe(map((objectValue: any) => objectValue.songCount));
  }
}
