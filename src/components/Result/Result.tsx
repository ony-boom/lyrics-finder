import React from "react";
import { ResultProps } from "../../types";
import Lyrics from "./Lyrics";
import Tag from "./Tag";

const Result: React.FC<ResultProps> = ({ lyrics, tag }) => {
  return (
    <div className="result-output">
      <Lyrics lyrics={lyrics} />
      <Tag {...tag} />
    </div>
  );
};

export default Result;
