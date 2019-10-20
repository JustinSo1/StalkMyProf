import React from "react";

const Search = props => {
  return (
    <div className="search-container">
      <h1 className="ui header">
        {props.header} name={props.name}>
      </h1>
      <div className="ui huge input">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Search;
