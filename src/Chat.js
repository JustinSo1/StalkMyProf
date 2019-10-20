import React from "react";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisabled: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { isDisabled } = this.state;
    this.setState({ isDisabled: true });
    if (!isDisabled) {
      const data = new FormData(e.target);
      const query = data.get("query");
      const answer = await this.getRequest(query);
      console.log(await answer);
    }
  }

  async getRequest(query) {
    var request = require("request");

    var options = {
      method: "POST",
      url:
        "https://api.genesysappliedresearch.com/v2/knowledge/knowledgebases/4b383246-2f38-4205-944e-fc2adc99f182/search",
      headers: {
        Connection: "keep-alive",
        "Content-Length": "476",
        "Accept-Encoding": "gzip, deflate",
        Host: "api.genesysappliedresearch.com",
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.18.0",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6IjliZDEyMjY4LTJkMGMtNDU4My05NjIzLWQ0YWUzMjQ3MzcwZiIsImV4cCI6MTU3MTU3MDUzMCwiaWF0IjoxNTcxNTY2OTMwfQ.jovA61B8IWPt-53b-5pAvETpgQ9tBLOUKQbC1tqe1Rg",
        organizationid: "9bd12268-2d0c-4583-9623-d4ae3247370f",
        "Content-Type": "application/json"
      },
      body: {
        query: query,
        pageSize: 1,
        pageNumber: 1,
        sortOrder: "string",
        sortBy: "string",
        languageCode: "en-US",
        documentType: "Faq"
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) console.log(error);
      return body.results[0].faq.answer;
    });
  }
  render() {
    return (
      <div className="container-chat">
        <div className="container-inner-chat">
          <form onSubmit={this.handleSubmit}>
            <div className="ui huge icon input">
              <input
                name="query"
                type="text"
                placeholder="Ask about a prof ..."
              />
              <i className="search icon"></i>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
