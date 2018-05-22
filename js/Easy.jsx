import React from 'react';

export class Easy extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <button onClick={this.props.onClick} className='btn1'>
      Hard
    </button>
  }
}
