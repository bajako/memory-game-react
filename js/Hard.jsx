import React from 'react';

export default class Hard extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='btn1'>
      Easy
    </button>;
  }
}
