import React from "react";
import { Search as SearchIcon } from "react-feather";
import { SearchContext } from "../../App";
import { ContextSearch, SearchProps } from "../../types";

import Button from "../Button";

const Heading: React.FC = () => {
  return <p className="main-heading">Search a Lyrics</p>;
};

const SearchInputBox: React.FC<SearchProps> = ({ found, clicked }) => {
  const { criteria, inputChangeHandler, clickHandler } = React.useContext(
    SearchContext
  ) as ContextSearch;
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(criteria.length > 0);
  }, [criteria]);

  let buttonText = "search"
  let buttonIsHidden = true;
  
  if (!found && clicked) {
    buttonText = "searching..."
  } else {
    buttonText = "search"
  }

  if (isActive && !clicked) {
    buttonIsHidden = false;
  } else if (clicked && !found) {
    buttonIsHidden = true;
  }

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
        disabled={buttonIsHidden}
        eventHandler={clickHandler}
        text={buttonText}
      />
    </div>
  );
};

const SearchBox: React.FC<SearchProps> = ({ found, clicked }) => {
  return (
    <>
      <Heading />
      <SearchInputBox found={found} clicked={clicked} />
    </>
  );
};

export default SearchBox;
