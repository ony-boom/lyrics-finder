import React, { ChangeEventHandler, MouseEventHandler } from "react";
import Search from "./components/Search";
import Result from "./components/Result";
import Error from "./components/Error";
import Paginate from "./components/Paginate";

//api
import api from "./api/api";
import { MetaDataProps, SongData, SongLyrics } from "./types";

//context
import { ContextSearch } from "./types";
export const SearchContext = React.createContext<ContextSearch | null>(null);

const App: React.FC = () => {
  const [criteria, setCriteria] = React.useState("");
  const [searchBtnClick, setSearchBtnClick] = React.useState(false);

  const [songData, setSongData] = React.useState<SongData>();
  const [tag, setTag] = React.useState<MetaDataProps>();

  const [found, setFound] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const resultComponentRef = React.useRef<HTMLDivElement>();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCriteria(event.target.value);
  };

  const handleSearch: MouseEventHandler<HTMLButtonElement> = async () => {
    if (hasError) {
      setHasError(false);
    }
    setSearchBtnClick(true);
    const setTagState = (data: object) => {
      const allMetaData: any = { ...data };

      const omittedProps = [
        "status",
        "durationMs",
        "shareUrl",
        "type",
        "lyrics",
      ];

      omittedProps.forEach((key) => {
        delete allMetaData[key];
      });

      setTag({ ...allMetaData });
    };

    try {
      const data = (await api.get("/search", { params: { name: criteria } }))
        .data;

      // i hate this timeout but the api have a rate limit per sercond so...
      setTimeout(async () => {
        setTagState(data);

        const lyrics: SongLyrics[] = (
          await api.get("/lyrics", {
            params: { trackId: data.id, format: "json" },
          })
        ).data;

        if (lyrics && lyrics.length > 0) {
          setFound(true);

          const songMetaData: SongData = {
            ...data,
            lyrics,
          };

          setSongData(songMetaData);
        }
      }, 300);
    } catch (err) {
      setHasError(true);
      setFound(true);
    }
  };

 
  React.useEffect(() => {
    setSearchBtnClick(false);
    setFound(false);
  }, [found]);

  // Value for the context
  const contextValue: ContextSearch = {
    clickHandler: handleSearch,
    criteria,
    inputChangeHandler: handleInputChange,
  };

  return (
    <div className="row">
      <SearchContext.Provider value={contextValue}>
        <Search found={found} clicked={searchBtnClick} />
        {tag && songData && (
          <>
            <Paginate />
            <Result
              lyrics={songData.lyrics}
              tag={tag}
              resultRef={resultComponentRef}
            />
          </>
        )}
        {hasError && <Error />}
      </SearchContext.Provider>
    </div>
  );
};

export default App;
