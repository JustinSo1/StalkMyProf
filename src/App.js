import React from "react";
import Form from "./Form";
import Chat from "./Chat";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.ref = React.createRef();
  }

  state = {
    containerSize: "100%",
    showChat: false
  };

  onClick(e) {
    e.preventDefault();
    this.setState({ containerSize: "200%", showChat: true });
    this.ref.current.scrollIntoView({
      behavior: "smooth"
    });
  }

  render() {
    const { containerSize, showChat } = this.state;
    let res;
    if (!showChat) {
      res = (
        <div className="container" style={{ height: containerSize }}>
          <div className="logo">
            <div className="ui header">Stalk</div>
            <i className="low vision icon"></i>
            <div className="ui header">Your Prof</div>
          </div>
          <Form onClick={this.onClick}></Form>
          <div ref={this.ref} className="bottom"></div>
        </div>
      );
    } else {
      res = (
        <div className="container" style={{ height: containerSize }}>
          <div className="logo">
            <div className="ui header">Stalk</div>
            <i className="low vision icon"></i>
            <div className="ui header">Your Prof</div>
          </div>
          <Form onClick={this.onClick}></Form>
          <Chat></Chat>
          <div ref={this.ref} className="bottom"></div>
        </div>
      );
    }
    return res;
  }
}
export default App;
