import React, { MouseEventHandler } from "react";
import { MetaDataProps } from "../../types";
import Button from "../Button";
import Bio from "./Bio";

const Tag: React.FC<MetaDataProps> = ({
  name,
  artists,
  durationText,
  album,
}) => {
  const cover = album.cover[album.cover.length - 1] || album.cover[0];

  const artistName = artists[0].name;

  const handleDownload: MouseEventHandler<HTMLButtonElement> = async () => {
    console.log("downloading");
  };
  return (
    <div className="metadata">
      <div className="metadata--wrapper">
        <div className="metadata__cover">
          <img src={cover.url} alt={`${name} - ${artists[0].name}`} />
        </div>
        <div className="metadata__tittle">
          <h2 className="heading-secondary">{name}</h2>
          <p>{album.name}</p>
          <p className="lead">
            {artists.map((a) => {
              return (
                <span key={a.id}>
                  {a.name}
                  {(artists.length > 1 && ", ") ||
                    artists.indexOf(a) !== artists.length - 1}
                </span>
              );
            })}
          </p>
          <p className="text-muted">{durationText}</p>

          <Button
            disabled={false}
            text={"Download Lyrics"}
            type={"primary"}
            eventHandler={handleDownload}
          />
        </div>
      </div>
      <Bio artistName={artistName} />
    </div>
  );
};

export default Tag;
