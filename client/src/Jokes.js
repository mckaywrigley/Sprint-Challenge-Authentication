import React, { Component } from "react";
import axios from "axios";
import requiresAuth from "./requiresAuth";

class Jokes extends Component {
  constructor() {
    super();
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3300/api/jokes`)
      .then(res => {
        console.log(res);
        this.setState({
          jokes: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.jokes.length === 0) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div>
        <h2>Users</h2>
        {this.state.jokes.map(joke => {
          return (
            <div key={joke.id}>
              <p>{joke.joke}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default requiresAuth(Jokes);
