import React from 'react';

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);
  };
  someFnChoice = () => {
    const cardInfo = this.props.card;
    this.props.callbackFromParentChoice(cardInfo);
  };
  render(){
    return (
      <input type='image' src={this.props.card.cover} disabled={this.props.card.disable}  className='memoryItem' key={this.props.card.pair} onClick={this.someFnChoice} />
    )
  }
}
