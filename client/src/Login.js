import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(`http://localhost:3300/api/login`, user)
      .then(res => {
        console.log(res);
        localStorage.setItem("jwt", res.data.token);
        if (res.data.token) {
          axios.defaults.headers.common["Authorization"] = res.data.token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
        const decoded = jwt_decode(res.data.token);
        this.setState({
          loggedIn: true
        });
        this.props.history.push("/jokes");
      })
      .catch(err => console.log(err));
    this.setState({
      username: "",
      password: ""
    });
    console.log(this.state);
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <p>Logged in!</p>
        </div>
      );
    }
    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
