import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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
    axios
      .post(`http://localhost:3300/api/register`, this.state)
      .then(res => {
        console.log(res);
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
            this.props.history.push("/jokes");
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
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

export default Register;
