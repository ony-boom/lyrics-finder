interface MetaData<T extends string> {
  type: T;
  id: string;
  name: string;
  shareUrl: string;
}

interface SongData extends MetaData<"track"> {
  status: boolean;
  durationMs: number;
  durationText: string;
  artists: SongArtist[];
  album: SongAlbum;
  lyrics: SongLyrics[];
}

interface SongArtist extends MetaData<"artist"> {
  nickname?: string;
}

interface Cover {
  url: string,
  width: number,
  height: number
}

interface SongAlbum extends MetaData<"album"> {
  cover: Cover[];
}

interface SongLyrics {
  startMs: number;
  durMs: number;
  text: string;
}

export type { SongData, SongLyrics };
