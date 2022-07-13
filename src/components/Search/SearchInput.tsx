import React from "react";
import { Search as SearchIcon } from "react-feather";
import { SearchContext } from "../../App";
import { ContextSearch } from "../../types";

import Button from "../Button";

const Heading: React.FC = () => {
  return <p className="main-heading">Search a Lyrics</p>;
};

const SearchInputBox: React.FC = () => {
  const { criteria, inputChangeHandler, clickHandler } = React.useContext(
    SearchContext
  ) as ContextSearch;
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(criteria.length > 0);
  }, [criteria]);

  return (
    <div className="search-box">
      <div className="search-box__input">
        <label htmlFor="search">
          <SearchIcon size={20} />
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Song name"
          value={criteria}
          onChange={inputChangeHandler}
        />
      </div>
      <Button
        type={isActive ? "primary" : ""}
        disabled={!isActive}
        eventHandler={clickHandler}
      />
    </div>
  );
};

const SearchBox: React.FC = () => {
  return (
    <>
      <Heading />
      <SearchInputBox />
    </>
  );
};

export default SearchBox;
