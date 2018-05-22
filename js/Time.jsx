import React from 'react';

export class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    }
  };
  componentDidMount() {
    this.tick = () => {
      if (this.props.points > this.props.maxPoints) {
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
        }));
        this.someFnTimer();
      }
      this.intervalId = setTimeout(this.tick, 1000)
    };
    this.intervalId = setTimeout(this.tick, 1000)
  };
  componentWillUnmount() {
    clearInterval(this.intervalId)
  };
  someFnTimer = () => {
    const timerInfo = this.state.timer;
    this.props.callbackFromParentTimer(timerInfo);
  };
  render(){
    const timeRecord = this.state.timer;
    return <div className='invisible'>{timeRecord}</div>
  }
}
