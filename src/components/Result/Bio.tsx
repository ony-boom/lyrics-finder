import React from "react";
import { lastFm } from "../../api/api";
const scrobbleApiKey = import.meta.env.VITE_LAST_FM_API_KEY;

const Bio: React.FC<{ artistName: string }> = ({ artistName }) => {
  const [bio, setBio] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const { data } = await lastFm.get("/?method=artist.getinfo", {
        params: {
          artist: artistName,
          api_key: scrobbleApiKey,
          format: "json",
        },
      });
      setBio(data.artist.bio.content);
    })();
  }, [artistName]);

  return (
    <div className="bio">
      <h2 className="bio__heading">About {artistName}</h2>
      {bio ? (
        <p
          className="simple-text"
          dangerouslySetInnerHTML={{ __html: bio }}
        ></p>
      ) : (
        <p className="text-muted">{`Getting ${artistName} bio... 🚀`}</p>
      )}
    </div>
  );
};

export default Bio;
