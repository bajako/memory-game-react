import React from "react";
import {GameBoard} from './GameBoard.jsx';
import easy from './LevelEasy';
import hard from './LevelHard';
import {shuffle} from './Shuffle.js';

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersChoice: '',
      disable: false,
      pair: '',
      prevPlayersChoice: '',
    };
    shuffle(easy);
  };
  myCallback = (playersChoice) => {
    console.log(playersChoice);
    this.setState({
      playersChoice: playersChoice
    });
    // When start first game, or just found a pair
    if (this.state.pair === '') {
      this.setState({
        pair: playersChoice.pair
      });
      this.setState(prevState => ({
          prevPlayersChoice: prevState.playersChoice
        }
      ));
      // Picked 'dot' shows the image behind itself
      playersChoice.cover = playersChoice.image
    }
    // When a second choice does not reveal the same image
    else if (!(playersChoice.pair === 1 + this.state.pair || playersChoice.pair === this.state.pair.substr(1))) {
      playersChoice.cover = playersChoice.image;
      // Both images disappear
      this.handleRestart(playersChoice, this.state.prevPlayersChoice)
    }
    // When the second choice reveals the same image
    else {
      this.setState(prevState => ({
          // points: prevState.points +1,
          prevPlayersChoice: prevState.playersChoice
        }
      ));
      this.setState({
        pair: '',
        playersChoice: playersChoice
      });
      this.state.cover = this.state.image;
      playersChoice.cover = playersChoice.image;
      this.state.prevPlayersChoice.disable = true;
      playersChoice.disable = true
    }
  };
  handleRestart = (playersChoice, prevPlayersChoice) => {
    setTimeout(() => {
      this.setState({
        pair: '',
        playersChoice: '',
        image: '',
        cover: ''
      });
      playersChoice.cover = 'img/cover.png';
      prevPlayersChoice.cover = 'img/cover.png';
    }, 200)
  };
  render() {
    let gameBoardElements;
    if (this.props.difficultyLevel) {
      gameBoardElements = easy.map(
        card => {
          return <GameBoard card={card} callbackFromParent={this.myCallback}/>
        })
    }
    else {
      gameBoardElements = hard.map(
        card => {
          return <GameBoard card={card} callbackFromParent={this.myCallback}/>
        })
    }
    return (
      <div>
        {gameBoardElements}
      </div>
    )
  }
}
