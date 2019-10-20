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
    formSize: "50%",
    showChat: false
  };

  async onClick() {
    this.setState({ containerSize: "200%", formSize: "25%", showChat: true });
    await new Promise(resolve => setTimeout(resolve, 100));
    this.ref.current.scrollIntoView({
      behavior: "smooth"
    });
  }

  render() {
    const { containerSize, showChat, formSize } = this.state;
    let res;
    if (!showChat) {
      res = (
        <div className="container" style={{ height: containerSize }}>
          <div className="logo">
            <div className="ui header">Stalk</div>
            <i className="low vision icon"></i>
            <div className="ui header">My Prof</div>
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
            <div className="ui header">My Prof</div>
          </div>
          <Form onClick={this.onClick} formSize={formSize}></Form>
          <Chat></Chat>
          <div ref={this.ref} className="bottom"></div>
        </div>
      );
    }
    return res;
  }
}
export default App;
