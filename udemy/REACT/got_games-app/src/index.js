import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// class Example extends Component{
//     render (){
//         return this.props.children //выводиться то, что передали в props.children
//     }
// }
// //передаем в props.children  <h1>Hello</h1>. Можно передавать массив, число, компоненты...
// ReactDOM.render(<Example>
//     <h1>Hello</h1> 
// </Example>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));