import React from 'react';
import ReactDOM from 'react-dom';
import easy from './LevelEasy';
import hard from './LevelHard';
import {shuffle} from './Shuffle';
import {Cards} from './Cards.jsx';
import {Hard} from './Hard.jsx';
import {Easy} from './Easy.jsx';
import {Time} from './Time.jsx';
import {Records} from './Records.jsx';

class MemoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: true,
      points:null,
      startTimer: false,
      timer:null,
      maxPoints: 1
  }
  };
  handleSwitchToLevelHard	=	() =>	{
    this.setState({level: false, startTimer: false, points:0});
    shuffle(hard);
  };
  handleSwitchToLevelEasy	=	() =>	{
    this.setState({level: true, startTimer: false, points:0});
    shuffle(easy);
  };
  myCallbackPoints = (pointsInfo) => {
    this.setState({
      points: pointsInfo +1
    })
  };
  myCallbackClick = () => {
    this.setState({
      startTimer: true
    });
  };
  myCallbackTimer = (timerInfo) => {
    this.setState({
      timer: timerInfo
    })
  };
  render() {
    let difficulty;
    if (this.state.level) {
      difficulty	=	<Easy	onClick={this.handleSwitchToLevelHard} />
    }
    	else {
      difficulty	=	<Hard	onClick={this.handleSwitchToLevelEasy} />
    }
    if (this.state.points > this.state.maxPoints){
    return <Records points={this.state.points} timer={this.state.timer}/>
    }
    return(
      <div className='container'>
        <header>Mem.ry game</header>
        {difficulty}
        <Time points={this.state.points} startTimer={this.state.startTimer} maxPoints={this.state.maxPoints} callbackFromParentTimer={this.myCallbackTimer}/>
        <Cards difficultyLevel={this.state.level} callbackFromParentPoints={this.myCallbackPoints} callbackFromParentClick={this.myCallbackClick} points={this.state.points}/>
      </div>
    )
  }
}

const App = () => ( <MemoryTable /> );

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render( <App />, document.getElementById('app'))
});
