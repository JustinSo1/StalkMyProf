import React from "react";
import votes from "./votes.json";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisabled: false, answer: [], upvotes: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRequest = this.getRequest.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { isDisabled } = this.state;
    this.setState({ isDisabled: true });
    if (!isDisabled) {
      const data = new FormData(e.target);
      const query = data.get("query");
      await this.getRequest(query);
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
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6IjliZDEyMjY4LTJkMGMtNDU4My05NjIzLWQ0YWUzMjQ3MzcwZiIsImV4cCI6MTU3MTU4NTA1MywiaWF0IjoxNTcxNTgxNDUzfQ.i-O0RBvmnD0xK2CJ_6KzxqpJbqRF9RqOI_R4XIJD7pY",
        organizationid: "9bd12268-2d0c-4583-9623-d4ae3247370f",
        "Content-Type": "application/json"
      },
      body: {
        query: query,
        pageSize: 3,
        pageNumber: 1,
        sortOrder: "string",
        sortBy: "string",
        languageCode: "en-US",
        documentType: "Faq"
      },
      json: true
    };
    let i = this;
    request(options, function(error, response, body) {
      if (error) console.log(error);
      let answer = [];
      for (let res of body.results) {
        answer.push(res.faq.answer);
      }
      if (answer.length === 0)
        answer.push(
          "No answers for this question. Please try another question."
        );
      let upvotes = [];
      try {
        const answer_votes = JSON.parse(votes);
        for (let j = 0; j < answer.length; j++) {
          if (answer[j] in answer_votes) {
            upvotes[j] = answer_votes[answer[j]];
          } else {
            upvotes[j] = 0;
          }
        }
      } catch {
        for (let j = 0; j < answer.length; j++) {
          upvotes[j] = 0;
        }
      }
      i.setState({ answer, upvotes, isDisabled: false });
    });
  }

  vote(voteType, answer) {
    // voteType === "upvote" ? this.upvotes++ : this.upvotes--;
  }

  formatMultipleAnswers(answer) {
    let res = [];
    for (let a of answer) {
      res.push(
        <div className="ui visible message huge">
          <p>{a}</p>
          <i
            className="small angle up icon"
            onClick={() => this.vote("upvote", a)}
          ></i>
          <i
            className="small angle down icon"
            onClick={() => this.vote("downvote", a)}
          ></i>
        </div>
      );
    }
    return res;
  }

  render() {
    const { answer } = this.state;
    let res;
    if (answer.length === 0) {
      res = (
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
    } else {
      const answerJSX = this.formatMultipleAnswers(answer);
      res = (
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
            {answerJSX}
          </div>
        </div>
      );
    }
    return res;
  }
}

export default Chat;
