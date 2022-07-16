import React, { MouseEventHandler } from "react";
import { MetaDataProps } from "../../types";
import Bio from "./Bio";
import getDominantColor, { getTextColor } from "../../helpers/colors";
import api from "../../api/api";

const DownloadButton: React.FC<{
  colors: { dominant: string; text: string };
  handleDownload: MouseEventHandler<HTMLAnchorElement>;
}> = ({ colors, handleDownload }) => {
  return (
    <a
      style={{
        backgroundColor: `rgb(${colors.dominant})`,
        color: colors.text,
        display: "grid",
        placeItems: "center",
        textDecoration: "none",
      }}
      className="btn btn-primary"
      onClick={handleDownload}
    >
      Download lyrics
    </a>
  );
};

const Tag: React.FC<MetaDataProps> = ({
  id,
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
  const [lrc, setLrc] = React.useState<Blob>();
  const [getLrcError, setGetLrcError] = React.useState<boolean>();
  const cover = album.cover[album.cover.length - 1] || album.cover[0];
  const artistName = artists[0].name;

  const handleDownload: MouseEventHandler<HTMLAnchorElement> = async (
    event
  ) => {
    const btn = event.target as HTMLAnchorElement;
    if (lrc) {
      btn.href = URL.createObjectURL(lrc);
      btn.download = artistName + " - " + name + ".lrc";
    }
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

  React.useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await api.get("/lyrics", { params: { trackId: id } });
        const lyrics = res.data;

        const lrcFile = new Blob([lyrics], {
          type: "text/plain",
        });
        setLrc(lrcFile);
      } catch (err) {
        setGetLrcError(true);
      }
    }, 1000);
  }, [artistName, lrc]);

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
            {lrc && colors ? (
              <DownloadButton colors={colors} handleDownload={handleDownload} />
            ) : (
              <button className="btn" disabled>
                {!lrc && !getLrcError
                  ? "Making .lrc file..."
                  : getLrcError && "Can't download Lyrics"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Bio artistName={artistName} />
    </div>
  );
};

export default React.memo(Tag);
