import React from "react";
import Search from "./Search.js";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { onClick: props.onClick };
  }

  render() {
    const { onClick } = this.state;

    return (
      <div className="container-form">
        <form>
          <Search header={"University"} name={"University"}></Search>
          <Search header={"Department"} name={"Department"}></Search>
          <Search header={"Professor"} name={"Professor"}></Search>
          <button onClick={onClick} className="huge ui button">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
