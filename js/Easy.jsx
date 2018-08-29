import React from 'react';

export default class Easy extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='btn1'>
      Hard
    </button>;
  }
}
