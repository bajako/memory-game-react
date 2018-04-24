import React from 'react';
import ReactDOM from 'react-dom';
import images from './easy';
import images1 from './hard';

document.addEventListener('DOMContentLoaded', function () {


    class MemoryTable extends React.Component {
        componentDidMount = () => {
            this.intervalId = setInterval(() => {

                if (this.state.points > 8) {
                    this.setState(prevState => ({
                        timer: prevState.timer
                    }))
                }

                else if (!this.state.random) {
                    this.setState(prevState => ({
                        timer: prevState.timer + 1
                    }))
                }
            }, 1000)
        };
        componentWillUnmount = () => {
            clearInterval(this.intervalId)
        };
        // mieszam plansze
        shuffle = (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            array.forEach(function (playersChoice) {
                playersChoice.disable = false;
                playersChoice.cover = 'img/cover.png';
            });


            return array;
        };
        // kliknięcie w planszę
        handleClick = (e, playersChoice) => {
            this.setState({
                random: false,
                playersChoice: playersChoice,
                disable: playersChoice.disable
            });


            //gdy zaczynam pierwszą grę lub gdy przed chwilą odkryłem parę
            if (this.state.pair === "") {
                this.setState({
                    pair: playersChoice.pair
                });


                this.setState(prevState => ({
                        prevPlayersChoice: prevState.playersChoice
                    }
                ));

                playersChoice.cover = playersChoice.image
            }

            // jeśli drugie kliknięcie nie odkrywa tej samej planszy
            else if (!(playersChoice.pair === 1 + this.state.pair || playersChoice.pair === this.state.pair.substr(1))) {


                playersChoice.cover = playersChoice.image;
                //biała kropka przyjmuje obraz elementu


                this.handleRestart(playersChoice, this.state.prevPlayersChoice)
                //     karty znowu stają się białe


            }




// jeśli mój dugi wybór odkrwa parę
            else {

                this.setState(prevState => ({
                        points: prevState.points + 1,
                        prevPlayersChoice: prevState.playersChoice
                    }
                ));


                this.setState({
                    pair: '',
                    playersChoice: playersChoice
                });


                playersChoice.cover = playersChoice.image;
                this.state.prevPlayersChoice.disable = true;
                this.state.cover = this.state.image;
                playersChoice.disable = true

            }


        };
        // po nieudanej próbie plansze ponownie zmieniają się na kropkę
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
        handleEasy = () => {
            this.setState({
                level: 'easy',
                random: true
            })
        };
        handleHard = () => {
            this.setState({
                level: 'hard',
                random: true,
            })
        };
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


            localStorage.setItem("memoRecords", JSON.stringify(arr));

        };

        constructor(props) {
            super(props);
            this.state = {
                points: 0,
                cover: '',
                random: true,
                pair: '',
                playersChoice: '',
                prevPlayersChoice: '',
                disable: false,
                timer: 0,
                level: 'easy',
                playersName: '',
                active: false
            }
        }

        render() {

            let items = '';

            if (this.state.points > 8) {
                let playersTime = this.state.timer;

                let playersResult = ` ${playersTime < 10 ?
                    '00:0' + playersTime
                    : playersTime < 60 ?
                        '00:' + playersTime
                        : playersTime % 60 < 10 ?
                            '0' + Math.floor(playersTime / 60) + ':0' + playersTime % 60 :
                            '0' + Math.floor(playersTime / 60) + ':' + playersTime % 60}`;

                let miejsce = {
                    playersName: this.state.playersName,
                    playersResult: playersResult,
                    playersTime: playersTime
                };


                var recordArr = (typeof localStorage['memoRecords'] != 'undefined') ? JSON.parse(localStorage.getItem('memoRecords')) : [
                    {playersName: 'Test', playersResult: '03:50', playersTime: 230}]


                let tabl = recordArr.sort(function (a, b) {
                    return a.playersTime - b.playersTime
                }).map((recordArr, index) =>
                    <p key={index}>{index + 1}
                        <span>   {recordArr.playersName}  </span>
                        <span>{recordArr.playersResult}</span>
                    </p>);

                recordArr.push(miejsce);

                return (<div className='fullScreen memoryTable'>
                        <div className='two_col'>
                            <p>Gratulacje!</p>
                            <h4>Twój wynik to {playersResult}</h4>

                            <h3>

                                {recordArr.length < 5

                                    ?

                                    <form onSubmit={e => this.handleSubmit(e, recordArr)}><input
                                        disabled={this.state.active}
                                        type='text'
                                        hidden={this.state.active}
                                        onChange={this.handleNameChange}/><input
                                        hidden={this.state.active} disabled={this.state.active} type='submit'
                                        value='Wpisz imię'
                                        className='btn2'/>
                                    </form>
                                    :
                                    miejsce.playersTime < recordArr[recordArr.length - 2].playersTime
                                        ?
                                        recordArr.splice(recordArr.length - 2, 1) &&
                                        <form onSubmit={e => this.handleSubmit(e, recordArr)}><input
                                            disabled={this.state.active}
                                            type='text'
                                            hidden={this.state.active}
                                            onChange={this.handleNameChange}/><input
                                            hidden={this.state.active} disabled={this.state.active} type='submit'
                                            value='Wpisz imię'
                                            className='btn2'/>
                                        </form>
                                        :
                                        <a>oj słabiutko ;)</a>
                                }

                            </h3>
                        </div>


                        <div className='two_col'>
                            <p>Tablica wyników</p>
                            <h4> {tabl} </h4>


                        </div>
                        <div className='bottom'><input type='button' className='btn2' value='Jeszcze raz?'
                                                       onClick={() => {
                                                           window.location.reload()
                                                       }}/></div>
                    </div>
                )


            }


            else if (this.state.level === 'easy') {

                if (this.state.random) {
                    this.shuffle(images);
                }


                items = images.map(image => {


                    return (
                        <input type="image" src={image.cover} disabled={image.disable}
                               onClick={e => this.handleClick(e, image)} className='memoryItem' key={image.pair}/>

                    )
                });

            }

            else if (this.state.level === 'hard') {

                if (this.state.random) {
                    this.shuffle(images1);
                }

                items = images1.map(image => {


                    return (
                        <input type="image" src={image.cover} disabled={image.disable}
                               onClick={e => this.handleClick(e, image)} className='memoryItem' key={image.pair}/>

                    )
                });
            }


            return (
                <div className='container'>
                    <header>Mem.ry game</header>
                    <div className='level'>
                        <input type='button' className='btn1' value='łatwa' onClick={this.handleEasy}/>
                        <input type='button' className='btn1' value='trudna' onClick={this.handleHard}/>
                    </div>
                    <div className='memoryTable'>
                        {items}
                    </div>
                </div>
            )
        }
    }


    class App extends React.Component {
        render() {
            return (
                <MemoryTable/>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});