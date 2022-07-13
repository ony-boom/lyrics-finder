interface MetaData<T> {
  type: T | string;
  id: string;
  name: string;
  shareUrl: string;
}

interface SongData extends MetaData<"track"> {
  status: boolean;
  durationMs: number;
  duartionText: string;
  artist: SongArtist[];
  album: SongAlbum;
  lyrics: SongLyrics[];
}

interface SongArtist extends MetaData<"artist"> {
  nickname?: string;
}

interface SongAlbum extends MetaData<"album"> {
  cover: object[];
}

interface SongLyrics {
  startMs: number;
  durMs: number;
  text: string;
}

export type { SongData };
