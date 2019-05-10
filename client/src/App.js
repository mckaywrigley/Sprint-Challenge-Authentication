import React from "react";
import "./App.css";

import { BrowserRouter, Link, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Jokes from "./Jokes";

function App() {
  return (
    <div className="App">
      <h1>Dad Jokes</h1>
      <BrowserRouter>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/jokes">Jokes</Link>
        <button onClick={this.logout}>Logout</button>
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/jokes"
          component={Users}
          render={props => <Jokes {...props} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
