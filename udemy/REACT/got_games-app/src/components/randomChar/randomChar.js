import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
//import { Button } from 'reactstrap';

export default class RandomChar extends Component {

    // constructor(props){
    //     super(props);
    //    //console.log('constructor');
    // }

    gotServise = new GotService();
    state = {
        char:{},
        loading:true
        // name: null,
        // gender: null,
        // born: null,
        // died: null,
        // culture: null
    }
    //компонент появился и отрисовался на странице - здесь работаем с дом деревом и с сервером
    componentDidMount(){
        //console.log('mounting');
        this.updateChar();
        this.timerId = setInterval(this.updateChar,1500);
    }
    //компоненент удаляется со страницы. Вызывается до того, как dom структура будет удалена со страницы
    componentWillUnmount(){
        //console.log('unmounting');
         clearInterval(this.timerId);
    }

    onCharLoaded = (char) =>{
        this.setState({
            char,
            loading:false,
            error: false
        })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () =>{
       // console.log('update');
        const id = Math.floor(Math.random()*140 + 25);//от 25 персонажа до 140
        // если хотим постотреть ошибку - ставим в id какое-то большое число
        this.gotServise.getCharacter(id)    // возвращается promise Поэтому then. Получаем персонажа (char) и меняем state. Т.к новый state не зависит от старого - просто меняем
         .then(this.onCharLoaded)
         .catch(this.onError);
    }

    render() {
       // console.log('render');
        // const {name, gender, born, died, culture} = this.state;
        const {char,loading, error} = this.state;
        const errorMessage = error?<ErrorMessage/>:null;
        const spinner = loading? <Spinner/>:null;
        const content = !(loading || error)? <View char = {char} />:null;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
          
        );
    }
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>

        </>
    )
}
