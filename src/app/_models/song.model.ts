import { Album } from "./album.model";
import { Artist } from "./artist.model";

export class Song {
    id?: string;
    title?: string;
    uploadedDate?: any;
    isFeatured?: boolean = false;
    image?: any;
    audio?: any;
    artist?: any;
    album?: Album;
    search?: any;
}
