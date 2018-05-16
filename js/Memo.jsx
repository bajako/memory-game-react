import React from 'react';
import ReactDOM from 'react-dom';
import {Cards} from './Cards.jsx';
import {Hard} from './Hard.jsx';
import {Easy} from './Easy.jsx';
import easy from "./LevelEasy";
import hard from "./LevelHard";
import {shuffle} from './Shuffle.js';

class MemoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: true,
    }
  };
  handleSwitchToLevelHard	=	()	=>	{
    this.setState({level: false});
    shuffle(hard);
  };
  handleSwitchToLevelEasy	=	()	=>	{
    this.setState({level: true});
    shuffle(easy);
  };
  render() {
    let difficulty;
    if (this.state.level) {
      difficulty	=	<Easy	onClick={this.handleSwitchToLevelHard}	/>
    }
    	else {
      difficulty	=	<Hard	onClick={this.handleSwitchToLevelEasy}	/>
    }
    return(
      <div className='container'>
        <header>Mem.ry game</header>
        <h1>{this.state.level}</h1>
        <h2>{difficulty}</h2>
        <Cards difficultyLevel={this.state.level} />
      </div>
    )
  }
}

const App = () => ( <MemoryTable /> );

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render( <App />, document.getElementById('app'))
});
