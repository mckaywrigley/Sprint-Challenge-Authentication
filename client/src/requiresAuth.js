import React, { Component } from "react";
import axios from "axios";

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      if (!localStorage.getItem("jwt")) {
        return <p>Please Login</p>;
      }
      return <Component {...this.props} />;
    }
  };
}
