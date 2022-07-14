import React from "react";
import { SongLyrics } from "../../types";

const Lyrics: React.FC<{ lyrics: SongLyrics[] }> = ({ lyrics }) => {
  return (
    <div className="lyrics">
      {lyrics.map((l, idx) => (
        <p key={idx}>{l.text}</p>
      ))}
    </div>
  );
};

export default Lyrics;
