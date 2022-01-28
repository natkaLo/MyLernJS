
import {createStore, bindActionCreators} from 'redux'
//console.log('Hello redux');

import reducer from './reducer';
//import {inc, dec, rnd} from './actions';
import * as actions from './actions' //вытаскиваем все из файла actions и это будет объект, кот. будем называть action
//получиться объект actions. Ключ и значение одинаковы, поэтому можно не указывать
// actions = {
//     inc: inc,
//     dec: dec,
//     rnd :rnd
// }

const store = createStore (reducer); //createStore из библиотеки redux. Аргумент - наша функция. Он ее вызовет сразу здесь при создании и попадет в state = 0
//state уже содержиться в store
//onsole.log(store.getState()); // 0

//ф-ция subscribe - ф-ция подписки на наш store. Когда стор будет изменяться, каждый раз будет вызываться колбек ф-ция, переданная в subscribe (сейчас стрелочная)
//должна быть написана выше того как наш store изменялся (выше dispatch)
// store.subscribe(()=>{
//   console.log(store.getState());
// })

// store.dispatch({type: 'INC'}); //нужно, чтобы запустить редьюсер с тем стейтом, что у нас есть в store и тем экшеном, который здесь передаем
// //console.log(store.getState()); //1
// store.dispatch({type: 'INC'});
// store.dispatch({type: 'INC'});
// store.dispatch({type: 'INC'});

const {dispatch} = store;

//функция создатель (crater) action creatorov
//она генерирует другую ф-цию
//первый аргумент - action creator (напр. inc())
//второй аргумент - dispatch
//она создает еще одну ф-цию )=> () =>{
//т.к могут быть нужны параметры, мы их передаем во вторую ф-цию при помощи rest оператора
//эта ф-ция есть в библиотеке
// const bindActinCreator = (creator, dispatch) => (...args) => {
//     dispatch(creator(...args));
// }

//const incDispatch = () => dispatch(inc());
//const incDispatch = bindActionCreators(inc, dispatch);
//const decDispatch = () => dispatch(dec());
//const decDispatch = bindActionCreators(dec, dispatch);
//const rndDispatch = (value) => dispatch(rnd(value));
//const rndDispatch = bindActionCreators(rnd, dispatch);

//bindActionCreators из библиотеки redux
//ф-ция возвращает объет с такими же ключами, которые мы передали
// const {incDispatch, decDispatch,rndDispatch } = bindActionCreators(
//   {
//     incDispatch: inc,
//     decDispatch: dec,
//     rndDispatch :rnd
//   }, dispatch
// );
const {inc, dec,rnd } = bindActionCreators(actions,dispatch); //после import * as actions from './actions'

document.getElementById('inc').addEventListener('click',inc);
//document.getElementById('inc').addEventListener('click',incDispatch);
//document.getElementById('inc').addEventListener('click',()=>{
  //store.dispatch({type: 'INC'});
  //store.dispatch(inc());  //вызвали нашу функцию, которая назвается action creater
  //  dispatch(inc());  // для const {dispatch} = store;
//});
document.getElementById('dec').addEventListener('click',dec);
//document.getElementById('dec').addEventListener('click',decDispatch);
// document.getElementById('dec').addEventListener('click',()=>{
//   // store.dispatch({type: 'DEC'});
//   //store.dispatch(dec());
//   dispatch(dec());  // для const {dispatch} = store;
// });

 document.getElementById('rnd').addEventListener('click',()=>{
   const value = Math.floor(Math.random() * 10); 
   //store.dispatch({type: 'RND',value});
  //store.dispatch(rnd(value));
  //dispatch(rnd(value));  // для const {dispatch} = store;
   // rndDispatch(value);
   rnd(value);
 });

const update = () => {
  document.getElementById('counter').textContent = store.getState();
}
store.subscribe(update);
