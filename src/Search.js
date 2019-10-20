import React from "react";

const Search = props => {
  const possibleError = props.message ? "" : "error";
  console.log(possibleError);
  return (
    <div className="search-container">
      <h1 className="ui header">{props.header}</h1>
      <div className={`ui huge input ${possibleError}`}>
        <input type="text" name={props.name} placeholder="Search..." />
      </div>
    </div>
  );
};

export default Search;
