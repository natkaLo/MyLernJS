import React from 'react';
import  ReactDOM from 'react-dom';
import {createStore} from 'redux';
//Provider - обертка, кот. нужна, чтобы передать параметры по всему приложению ниже
import { Provider } from 'react-redux';
import reducer from './reducer';
//import * as actions from './actions'; //после подключения Provider
import App from './components/app'

const store = createStore(reducer);
//const {dispatch} = store;//после подключения Provider
//const {inc,dec,rnd} = bindActionCreators(actions,dispatch);//после подключения Provider

// ф-ция update нужна без  Providera. У него уже есть
//const update = () => {
  //помещаем компонент Counter на страницу и передаем в качестве пропсов значение счетчика и ф-ции, которые будут срабатывать при клике
  //делаем это в update (когда стор изменяется)
  // ReactDOM.render(<Counter
  //         counter = {store.getState()}
  //         inc = {inc}
  //         dec = {dec}
  //         rnd = { () => {
  //         const value = Math.floor(Math.random() * 10); 
  //         rnd(value);}}
  // />, document.getElementById('root'));
  //создали компонент нашего приложения и рендерить будем его
  //<Provider store={store}> - что мы хотим передать компонента, находящимся между  <Provider> и </Provider> И тепер app может использовать все, что связано со стором
  ReactDOM.render(
          <Provider store={store}>
              <App/>
          </Provider>
          , document.getElementById('root'));
//}
//нужны без  Providera. У него уже есть
// update(); //для первой отрисовки
// store.subscribe(update); //подпись на стор


//------------------------------------------------------------------------------------
//до подключения react componenta. Заменяем работу с DOM api на работу с реакт компонентом
// import {createStore, bindActionCreators} from 'redux'
// //console.log('Hello redux');

// import reducer from './reducer';
// //import {inc, dec, rnd} from './actions';
// import * as actions from './actions' //вытаскиваем все из файла actions и это будет объект, кот. будем называть action
// //при тако импорте получиться объект actions. Ключ и значение одинаковы, поэтому можно не указывать
// // actions = {
// //     inc: inc,
// //     dec: dec,
// //     rnd :rnd
// // }

// const store = createStore (reducer); //createStore из библиотеки redux. Аргумент - наша функция. Он ее вызовет сразу здесь при создании и попадет в state = 0
// //state уже содержиться в store
// //onsole.log(store.getState()); // 0

// //ф-ция subscribe - ф-ция подписки на наш store. Когда стор будет изменяться, каждый раз будет вызываться колбек ф-ция, переданная в subscribe (сейчас стрелочная)
// //должна быть написана выше того как наш store изменялся (выше dispatch)
// // store.subscribe(()=>{
// //   console.log(store.getState());
// // })

// // store.dispatch({type: 'INC'}); //нужно, чтобы запустить редьюсер с тем стейтом, что у нас есть в store и тем экшеном, который здесь передаем
// // //console.log(store.getState()); //1
// // store.dispatch({type: 'INC'});
// // store.dispatch({type: 'INC'});
// // store.dispatch({type: 'INC'});

// const {dispatch} = store;

// //создадим свою ф-цию, создающую другие ф-ции (action creator)
// //функция создатель (crater) action creator (чтобы не использовать каждый раз своего рода баундинг (привязку ф-ций))
// //она генерирует другую ф-цию
// //первый аргумент - action creator (напр. inc())
// //второй аргумент - dispatch
// //она создает еще одну ф-цию )=> () =>{
// //т.к могут быть нужны параметры, мы их передаем во вторую ф-цию при помощи rest оператора
// //эта ф-ция есть в библиотеке
// // const bindActinCreator = (creator, dispatch) => (...args) => {
// //     dispatch(creator(...args));
// // }
// // своего рода баундинг - связали ф-цию incDispatch с dispatch (inc())
// //const incDispatch = () => dispatch(inc());
// //const incDispatch = bindActionCreator(inc, dispatch);// исползование нашего bindActinCreator
// //const incDispatch = bindActionCreators(inc, dispatch);// исползование стандартного bindActinCreators из библиотеки redux
// //const decDispatch = () => dispatch(dec());
// //const decDispatch = bindActionCreator(dec, dispatch);// исползование нашего bindActinCreator
// //const decDispatch = bindActionCreators(dec, dispatch);// исползование стандартного bindActinCreators из библиотеки redux
// //const rndDispatch = (value) => dispatch(rnd(value));
// //const rndDispatch = bindActionCreator(rnd, dispatch);// исползование нашего bindActinCreator
// //const rndDispatch = bindActionCreators(rnd, dispatch);// исползование стандартного bindActinCreators из библиотеки redux

// //уже есть стандаротная bindActionCreators из библиотеки redux
// //она позволяет забиндить сразу несколько функций в виде объекта
// // мы передаем в нее функции в виде объекта. Т.к. это объект - он должен содержать ключ - значение. Знчение - ф-ция из actions.js
// //ф-ция возвращает объет с такими же ключами, которые мы передали. Мы получим обернутые ф-ции, которые будут использовать dispatch (как  () => dispatch(inc());)
// //объект десруктурировали
// // const {incDispatch, decDispatch,rndDispatch } = bindActionCreators(
// //   {
// //     incDispatch: inc,
// //     decDispatch: dec,
// //     rndDispatch :rnd
// //   }, dispatch
// // );


// //const {incDispatch, decDispatch,rndDispatch } = bindActionCreators(actions,dispatch); //после import * as actions from './actions'
// //запись проще
// const {inc, dec,rnd } = bindActionCreators(actions,dispatch); // inc, dec, rnd - это уже обернутые в dispatch ф-ции, а не те-же что в actions.js

// document.getElementById('inc').addEventListener('click',inc); // после const {inc, dec,rnd } = bindActionCreators(actions,dispatch);
// //document.getElementById('inc').addEventListener('click',incDispatch); // const incDispatch = () => dispatch(inc()); и для const {incDispatch, decDispatch,rndDispatch } = bindActionCreators
// //document.getElementById('inc').addEventListener('click',()=>{
//   //store.dispatch({type: 'INC'});
//   //store.dispatch(inc());  //вызвали нашу функцию, которая назвается action creater
//   //  dispatch(inc());  // для const {dispatch} = store;
// //});
// document.getElementById('dec').addEventListener('click',dec);// после const {inc, dec,rnd } = bindActionCreators(actions,dispatch);
// //document.getElementById('dec').addEventListener('click',decDispatch); // const decDispatch = () => dispatch(dec());и для const {incDispatch, decDispatch,rndDispatch } = bindActionCreators
// // document.getElementById('dec').addEventListener('click',()=>{
// //   // store.dispatch({type: 'DEC'});
// //   //store.dispatch(dec());
// //   dispatch(dec());  // для const {dispatch} = store;
// // });

//  document.getElementById('rnd').addEventListener('click',()=>{
//    const value = Math.floor(Math.random() * 10); 
//    //store.dispatch({type: 'RND',value});
//   //store.dispatch(rnd(value));// const rndDispatch = () => dispatch(rnd(value));и для const {incDispatch, decDispatch,rndDispatch } = bindActionCreators
//   //dispatch(rnd(value));  // для const {dispatch} = store;
//    // rndDispatch(value);
//    rnd(value);// после const {inc, dec,rnd } = bindActionCreators(actions,dispatch);
//  });

// const update = () => {
//   document.getElementById('counter').textContent = store.getState();
// }
// store.subscribe(update);
