import React from 'react';
import easy from './LevelEasy';
import hard from './LevelHard';
import {shuffle} from './Shuffle';
import {GameBoard} from './GameBoard.jsx';

export class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersChoice: '',
      disable: false,
      pair: '',
      points: 0,
      prevPlayersChoice: '',
    };
    shuffle(easy);
  };
  myCallbackChoice = (playersChoice) => {
    this.setState({
      playersChoice: playersChoice,
    });
    // Timer starts with first click of every new game
    if (!this.state.start) {
      this.setState({
        start: true });
    }
    // When start first game, or just found a pair
    this.someFnClick();
    if (this.state.pair === '') {
      this.setState({
        pair: playersChoice.pair });
      this.setState( prevState => ({
        prevPlayersChoice: prevState.playersChoice }));
      // Picked 'dot' shows the image behind itself
      playersChoice.cover = playersChoice.image
    }
    // When a second choice does not reveal the same image
    else if (!(playersChoice.pair === 1 + this.state.pair || playersChoice.pair === this.state.pair.substr(1))) {
      playersChoice.cover = playersChoice.image;
      // Both images disappear
      this.handleRestart(playersChoice, this.state.prevPlayersChoice);
      // If this is a new game, player starts with 0 points
      if(this.props.points===0){
        this.setState({
          points: 0,
        })
      }
    }
    // When the second choice reveals the same image
    else {
      this.setState(prevState => ({
          points: prevState.points +1,
          prevPlayersChoice: prevState.playersChoice,
        }
      ));
      this.setState({
        pair: '',
        playersChoice: playersChoice,
      });
      this.someFnPoints();
      this.state.cover = this.state.image;
      playersChoice.cover = playersChoice.image;
      this.state.prevPlayersChoice.disable = true;
      playersChoice.disable = true;
    }
  };
  handleRestart = (playersChoice, prevPlayersChoice) => {
    setTimeout(() => {
      this.setState({
        pair: '',
        playersChoice: '',
        image: '',
        cover: '',
      });
      playersChoice.cover = 'img/cover.png';
      prevPlayersChoice.cover = 'img/cover.png';
    }, 200)
  };
  someFnPoints = () => {
    let pointsInfo = this.state.points;
    this.props.callbackFromParentPoints(pointsInfo);
  };
  someFnClick = () => {
    this.props.callbackFromParentClick();
  };
  render() {
    let gameBoardElements;
    if (this.props.difficultyLevel) {
      gameBoardElements = easy.map(
        card => {
          return <GameBoard card={card} callbackFromParentChoice={this.myCallbackChoice} />
        })
    }
    else {
      gameBoardElements = hard.map(
        card => {
          return <GameBoard card={card} callbackFromParentChoice={this.myCallbackChoice} />
        })
    }
    return (
      <div>
        {gameBoardElements}
      </div>
    )
  }
}
