//нужно поместить в index.js

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './components/app/app';
//import App from './components/app/'; //webpack если не указать файл - будет искать index.js

//события в react
// (надо закоментить import App from './components/app/) и ReactDOM.render(<App />,document.getElementById('root'));

//компонент в функциональном стиле. Менять их после создания и помещения на страницу мы их не можем.
//никакой компонент не будет хранить свои состояния

// вместо дивов надо оборачивать <React.Fragment>(без оборачивания нельзя)
// вместо <React.Fragment> </React.Fragment> можно писать пустые кавычки
//можно так function WhoAmI(props) - если убрать props - будет ошибка, т.к. мы их передаем


// function WhoAmI(props){
//     return (
//         <>        
//         <h1>My name is {props.name}, surname - {props.surname}</h1>
//         <a href = {props.link}>My profile</a>
//         </>
//     )
// }
// с деструкторизацией
// function WhoAmI({name, surname, link}){
//     return (
//         <>        
//         <h1>My name is {name}, surname - {surname}</h1>
//         <a href = {link}>My profile</a>
//         </>
//     )
// }

//поэтому нужно использовать классы
//props менять нельзя - они только для чтения
//this.state = - для того, чтобы что-то можно менять
class WhoAmI extends Component {
    constructor(props){
        super(props);
        this.state = {
            years:26,
            nationality:'uk'
        }
        //способы привязки контекста (this) к обработчику события
        // 1 и 2 нужно писать в конструкторе
        // 1 bind жесткая привязка метода к каждому экземпляру объекта (привязываем к контексту)
        //this.nextYear = this.nextYear.bind(this);
        //2 - написать обработчик в конструкторе
        // this.nextYear = () => {
        //     this.setState(state =>({
        //         years : ++state.years
        //     }))
        // }

        
    }
    // в новом стандарте можно писать без constructor{} a просто
    // state = {
    //     years:26
    // }
    //3 - class Fill - новая технология
    nextYear = () => {
        this.setState(state =>({
            years : ++state.years
        }))
    }
    // nextYear(){
    //     //this.state.years++; //так нельзя
    //     // this.setState({         //перезаписываем объект стейт. Выполняется осинхронно
    //     //     years: 27
    //     // });
    //     // Выполняется осинхронно поэтому пишем так/Передаем state- текущее состояние
    //     this.setState(state =>({
    //         years : ++state.years
    //     }))
    // }
    render(){
        const {name,surname,link} = this.props; //деструкторизация 
        const {years} = this.state;
        return (
            <>  
            <button onClick={this.nextYear}>++</button>      
            <h1>My name is {name}, surname - {surname} ,years - {years}</h1>
            <a href = {link}>My profile</a>
            </>
        )
    }
}

const All = () =>{
    return (
        <>        
       <WhoAmI name = 'John' surname = 'Smith' link ='facebook.com' />
       <WhoAmI name = 'Ivan' surname = 'Smol' link ='vk.com' />
       <WhoAmI name = 'Alex' surname = 'Shepard' link ='facebook.com' />
        </>
    )
}



ReactDOM.render(<All/>,document.getElementById('root'));



