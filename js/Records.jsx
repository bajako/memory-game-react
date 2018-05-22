import React from 'react';
import {playersResult} from './Result';

export class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      playersName: '',
    }
  }
  handleNameChange = (event) => {
    this.setState({
      playersName: event.target.value
    })
  };
  handleSubmit = (e, arr) => {
    e.preventDefault();
    this.setState({
      active: true
    });
    localStorage.setItem('memoRecords', JSON.stringify(arr));
  };
  render() {
    const playersTime = this.props.timer;
    const placeNumber = {
      playersName: this.state.playersName,
      playersResult: playersResult(playersTime),
      playersTime: playersTime
    };
    const recordArr = (typeof localStorage['memoRecords'] !== 'undefined') ? JSON.parse(localStorage.getItem('memoRecords')) : [{playersName: 'Test', playersResult: '03:50', playersTime: 230}];
    const scoreBoard = recordArr.sort(function (a, b) {
      return a.playersTime - b.playersTime }).map((recordArr, index) =>
      <p key={index}>{index + 1}
        <span>   {recordArr.playersName}  </span>
        <span>{recordArr.playersResult}</span>
      </p>);
    recordArr.push(placeNumber);
    
    return (
      <div className='container'>
        <header>Congratulations!</header>
        <div className='column'>
          <h1> Well done! </h1>
          <h2> Your result is {playersResult(playersTime)} </h2>
          <h3> {recordArr.length < 5
            ?
            <form onSubmit={e => this.handleSubmit(e, recordArr)}><input
              disabled={this.state.active}
              type='text'
              hidden={this.state.active}
              onChange={this.handleNameChange}/><input
              hidden={this.state.active} disabled={this.state.active} type='submit'
              value='Enter name'
              className='btn2'/>
            </form>
            :
            placeNumber.playersTime < recordArr[recordArr.length - 2].playersTime
              ?
              recordArr.splice(recordArr.length - 2, 1)
              &&
              <form onSubmit={e => this.handleSubmit(e, recordArr)}><input
                disabled={this.state.active}
                type='text'
                hidden={this.state.active}
                onChange={this.handleNameChange}/><input
                hidden={this.state.active} disabled={this.state.active} type='submit'
                value='Enter name'
                className='btn2'/>
              </form>
              :
              <a>but... this time it's not enough ;)</a>
          }</h3>
        </div>
        <div className='column'>
          <h1>Score Board</h1>
          <h4> {scoreBoard} </h4>
        </div>
        <div className='bottom'><input type='button' className='btn2' value="Let's try again?" onClick={() => { window.location.reload()}}/></div>
    </div>
  )}
}