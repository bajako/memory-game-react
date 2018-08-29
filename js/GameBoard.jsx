import React from 'react';

export default class GameBoard extends React.Component {
  someFnChoice = () => {
    const cardInfo = this.props.card;
    this.props.callbackFromParentChoice(cardInfo);
  };

  render() {
    return (
      <input type='image' src={this.props.card.cover} disabled={this.props.card.disable} className='memory-item'
             key={this.props.card.pair} onClick={this.someFnChoice}/>
    );
  }
}
