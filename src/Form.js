import React from "react";
import Search from "./Search.js";
import { tsThisType } from "@babel/types";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: props.onClick,
      formSize: props.formSize,
      messages: [true, true, true]
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.formSize !== prevProps.formSize) {
      this.setState({ formSize: this.props.formSize });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { messages } = this.state;
    const data = new FormData(e.target);
    data.get("university") === ""
      ? (messages[0] = false)
      : (messages[0] = true);
    data.get("department") === ""
      ? (messages[1] = false)
      : (messages[1] = true);
    data.get("professor") === "" ? (messages[2] = false) : (messages[2] = true);
    let moveDown = true;
    for (let mess of messages) if (!mess) moveDown = false;
    this.setState({ messages });
    if (moveDown) this.state.onClick();
  }

  render() {
    const { formSize, messages } = this.state;

    return (
      <div className="container-form" style={{ top: formSize }}>
        <form onSubmit={this.onSubmit}>
          <Search
            header={"University"}
            name={"university"}
            message={messages[0]}
          ></Search>
          <Search
            header={"Department"}
            name={"department"}
            message={messages[1]}
          ></Search>
          <Search
            header={"Professor"}
            name={"professor"}
            message={messages[2]}
          ></Search>
          <button className="huge ui button">Search</button>
        </form>
      </div>
    );
  }
}

export default Form;
