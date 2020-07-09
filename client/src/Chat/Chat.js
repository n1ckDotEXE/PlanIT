import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import TopBar from "./TopBar";
import { createBrowserHistory as createHistory } from "history";
import "./Chat.css";
import ChatRoomPage from "./ChatRoomPage";

const history = createHistory();

function Chat() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/chatroom" exact component={ChatRoomPage} />
      </Router>
    </div>
  );
}
export default Chat;