import React from 'react';

export class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    }
  };
  componentDidMount() {
    this.tick = () => {
      if (this.props.points > 2) {
        this.setState(prevState => ({
          timer: prevState.timer
        }))
      }
      else if(!this.props.startTimer) {
        this.setState({
          timer: 0,
        })
      }
      else if (this.props.startTimer) {
        this.setState(prevState => ({
          timer: prevState.timer + 1
        }))
      }
      this.intervalId = setTimeout(this.tick, 1000)
    };
    this.intervalId = setTimeout(this.tick, 1000)
  };
  render(){
    const timeRecord = this.state.timer;
    return <div>{timeRecord}</div>
  }
}
