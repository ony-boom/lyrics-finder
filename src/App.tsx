import React, { ChangeEventHandler, MouseEventHandler } from "react";
import Search from "./components/Search";

//api
import api from "./api/api";

//context
import { ContextSearch } from "./types";
export const SearchContext = React.createContext<ContextSearch | null>(null);

const App: React.FC = () => {
  const [criteria, setCriteria] = React.useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCriteria(event.target.value);
  };
  const handleSearch: MouseEventHandler<HTMLButtonElement> = async () => {
    const { data } = await api.get("/search", { params: { name: criteria } });
    const lyrics = (
      await api.get("/lyrics", {
        params: { trackId: data.id, format: "json" },
      })
    ).data;

    console.log(lyrics);
  };

  // Value for the context
  const contextValue: ContextSearch = {
    clickHandler: handleSearch,
    criteria,
    inputChangeHandler: handleInputChange,
  };

  return (
    <div className="row">
      <SearchContext.Provider value={contextValue}>
        <Search />
      </SearchContext.Provider>
    </div>
  );
};

export default App;
