import React from "react";
import SearchBox from "./SearchInput";
import { SearchProps } from "../../types";

const Search: React.FC<SearchProps> = ({ found, clicked }) => {
  return (
    <div className="Search">
      <SearchBox found={found} clicked={clicked} />
    </div>
  );
};

export default Search;
