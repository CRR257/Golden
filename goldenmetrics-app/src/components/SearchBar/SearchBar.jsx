import React from "react";

import "./SearchBar.css"

const SearchBar = props => {

  return (
    <form>
      <i className="fas fa-search"></i>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
        className="searchbar"
      />
    </form>
  );
};

export default SearchBar;
