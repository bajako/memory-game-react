import React from "react";

export class Hard extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <button onClick={this.props.onClick}>
      Easy
    </button>
  }
}
