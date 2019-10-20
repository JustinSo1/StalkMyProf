import React from "react";

const Search = props => {
  return (
    <div className="search-container">
      <h1 className="ui header" name={props.name}>
        {props.header}
      </h1>
      <div className="ui huge input">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Search;
