import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./Users/pages/Users";
import NewItem from "./Garden/pages/NewItem";
import UpdateItem from "./Garden/pages/UpdateItem";
import UserGarden from "./Garden/pages/UserGarden";
import HomePage from "./Chat/HomePage";
import ChatRoomPage from "./Chat/ChatRoomPage";
import Auth from "./Users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/garden" exact>
          <UserGarden />
        </Route>
        <Route path="/garden/new" exact>
          <NewItem />
        </Route>
        <Route path="/garden/:itemId">
          <UpdateItem />
        </Route>
        <Route path="/chat" exact component={HomePage} />
        <Route path="/chat/chatroom" exact component={ChatRoomPage} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/garden" exact>
          <UserGarden />
        </Route>
        <Route to="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
