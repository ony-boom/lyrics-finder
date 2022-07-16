import React from "react";
import { ResultProps } from "../../types";
import Lyrics from "./Lyrics";
import Tag from "./Tag";

const Result: React.FC<ResultProps> = ({ lyrics, tag, resultRef }) => {
  return (
    <div
      className="result-output"
      ref={resultRef as React.LegacyRef<HTMLDivElement>}
    >
      <Lyrics
        lyrics={lyrics}
      />
      <Tag {...tag}/>
    </div>
  );
};

export default React.memo(Result);
