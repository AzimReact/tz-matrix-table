import React, { Component } from "react";
import Table from "./Table";

export default class Main extends Component {
  render() {
    return (
      <>
        <h1>Table of stores by budget!</h1>
        <Table data={this.props.data} />
      </>
    );
  }
}
