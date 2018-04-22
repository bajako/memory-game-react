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
                        time: prevState.time
                    }))
                }

                else if (!this.state.random) {
                    this.setState(prevState => ({
                        time: prevState.time + 1
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

            array.forEach(function (el) {
                el.disable = false;
                el.cover = 'img/cover.png';
            });


            return array;
        };
        // kliknięcie w planszę
        handleClick = (e, el) => {
            this.setState({
                random: false,
                el: el,
                disable: el.disable
            });


            //gdy zaczynam pierwszą grę lub gdy przed chwilą odkryłem parę
            if (this.state.duo === "") {
                this.setState({
                    duo: el.duo
                });


                this.setState(prevState => ({
                        elPrev: prevState.el
                    }
                ));

                el.cover = el.image
            }

            // jeśli drugie kliknięcie nie odkrywa tej samej planszy
            else if (!(el.duo === 1 + this.state.duo || el.duo === this.state.duo.substr(1))) {


                el.cover = el.image;
                //biała kropka przyjmuje obraz elementu


                this.handleRestart(el, this.state.elPrev)
                //     karty znowu stają się białe


            }




// jeśli mój dugi wybór odkrwa parę
            else {

                this.setState(prevState => ({
                        points: prevState.points + 1,
                        elPrev: prevState.el
                    }
                ));


                this.setState({
                    duo: '',
                    el: el
                });


                el.cover = el.image;
                this.state.elPrev.disable = true;
                this.state.cover = this.state.image;
                el.disable = true

            }


        };
        // po nieudanej próbie plansze ponownie zmieniają się na kropkę
        handleRestart = (el, elPrev) => {
            setTimeout(() => {
                this.setState({
                    duo: '',
                    el: '',
                    image: '',
                    cover: ''
                });
                el.cover = 'img/cover.png';
                elPrev.cover = 'img/cover.png';
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
                name: event.target.value
            })
        };
        handleSubmit = (e, arr) => {
            e.preventDefault();
            this.setState({
                active: true
            });


            localStorage.setItem("rekordy", JSON.stringify(arr));

        };

        constructor(props) {
            super(props);
            this.state = {
                points: 0,
                cover: '',
                random: true,
                duo: '',
                el: '',
                elPrev: '',
                disable: false,
                time: 0,
                level: 'easy',
                name: '',
                active: false
            }
        }

        render() {

            let items = '';

            if (this.state.points > 8) {
                let czas = this.state.time;

                let wynik = ` ${czas < 10 ?
                    '00:0' + czas
                    : czas < 60 ?
                        '00:' + czas
                        : czas &&
                        '0' + Math.floor(czas / 60) + ':' + czas % 60}`;


                let miejsce = {
                    name: this.state.name,
                    wynik: wynik,
                    czas: czas
                };


                let recordArr = JSON.parse(localStorage.getItem('rekordy'));


                let tabl = recordArr.sort(function (a, b) {
                    return a.czas - b.czas
                }).map((recordArr, index) =>
                    <p key={index}>{index + 1}
                        <span>   {recordArr.name}  </span>
                        <span>{recordArr.wynik}</span>
                    </p>);

                recordArr.push(miejsce);


                return (<div className='fullScreen memoryTable'>
                        <div className='polowa'>
                            <p>Gratulacje!</p>
                            <h4>Twój wynik to {wynik}</h4>

                            <h3>{recordArr.length < 5

                            &&

                            <form onSubmit={e => this.handleSubmit(e, recordArr)}><input disabled={this.state.active}
                                                                                         type='text'
                                                                                         hidden={this.state.active}
                                                                                         onChange={this.handleNameChange}/><input
                                hidden={this.state.active} disabled={this.state.active} type='submit' value='Wpisz imię'
                                className='btn2'/>
                            </form>}


                            </h3>
                        </div>


                        <div className='polowa'>
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
                               onClick={e => this.handleClick(e, image)} className='memoryItem' key={image.duo}/>

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
                               onClick={e => this.handleClick(e, image)} className='memoryItem' key={image.duo}/>

                    )
                });
            }


            return (
                <div className='top'>
                    <div className='duza'>Mem.ry game</div>
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