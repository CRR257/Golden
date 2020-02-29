import React from "react";

import "./SearchBar.css";

const SearchBar = props => {
  return (
    <form>
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder="Search..."
        onChange={props.onChangeHandler}
        value={props.searchInput}
        className="searchbar"
      />
    </form>
  );
};

export default SearchBar;
