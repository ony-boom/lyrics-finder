import React, { MouseEventHandler } from "react";
import { MetaDataProps } from "../../types";
import Bio from "./Bio";
import getDominantColor, { getTextColor } from "../../helpers/colors";

const Tag: React.FC<MetaDataProps> = ({
  name,
  artists,
  durationText,
  album,
}) => {
  const imageEl = React.useRef<HTMLImageElement>(null);
  const [colors, setColors] = React.useState<{
    dominant: string;
    text: string;
  }>();
  const cover = album.cover[album.cover.length - 1] || album.cover[0];
  const artistName = artists[0].name;

  const handleDownload: MouseEventHandler<HTMLButtonElement> = async () => {
    console.log("downloading");
  };

  const handleImageLoad = () => {
    const dominantRgb = getDominantColor(imageEl.current!);
    const dominant = dominantRgb.join(",");
    const text = getTextColor(dominantRgb);
    setColors({
      dominant,
      text,
    });
  };

  return (
    <div className="metadata">
      <div className="metadata--wrapper">
        <div className="metadata__cover">
          <img
            src={cover.url}
            alt={`${name} - ${artists[0].name}`}
            ref={imageEl}
            onLoad={handleImageLoad}
            crossOrigin={"anonymous"}
          />
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
          <div className="button-wrapper">
            {colors && (
              <button
                style={{
                  backgroundColor: `rgb(${colors.dominant})`,
                  color: colors.text,
                }}
                className="btn btn-primary"
                onClick={handleDownload}
              >
                Download lyric
              </button>
            )}
          </div>
        </div>
      </div>
      <Bio artistName={artistName} />
    </div>
  );
};

export default Tag;
