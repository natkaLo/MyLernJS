
import {createStore} from 'redux'
//console.log('Hello redux');

//const initialState = 0;// наш счетчик 
//но мы поставили параметр по умолчанию для state(state = 0) чтобы избавиться от undefined, поэтому нам не нужен initialState
//функиця reducer управляет нашим стейтом. Первый аргумент - состояние, второй - действие, которое мы хотим сделать с переданным состоянием
//action - объект
const reducer = (state =0 , action) => {
  switch (action.type){
      case 'INC':
        return state+1;
      case 'DEC':
        return state-1;
      case 'RND':
        //мы не можем написать state + Math.floor(Math.random() * 10), потому что ф-ция reducer должна быть чистой, т.е должна зависить только от state  и action
        //а так она будет зависить от какой-то случайной велечены
        return state + action.value;
      default:
        return state;
  }
}

//вторым аргументом пердаем объект (action). type должен быть в объете всегда и значечение type должно быть строкой.type - это то действие, которое мы собираемся совершить
//let state = reducer(initialState, {type: 'INC'});
// let state = reducer(undefined, {});// сработает для state параметр по умолчанию 0. Передадим пустой объект - попадем в default
// state = reducer(state, {type: 'INC'});
// console.log(state);
// state = reducer(state, {type: 'INC'});
// console.log(state);

//ф-ция action creater
// нужна для того, чтобы в  dispatch не писать объект
//создает объект, который содержит type
// const inc = () =>{
//   return {
//     type: 'INC'
//   }
// }
//запись короче
const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rnd = (value) => ({type: 'RND', value});

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

document.getElementById('inc').addEventListener('click',()=>{
  //store.dispatch({type: 'INC'});
  store.dispatch(inc());  //вызвали нашу функцию, которая назвается action creater
});
document.getElementById('dec').addEventListener('click',()=>{
 // store.dispatch({type: 'DEC'});
 store.dispatch(dec());
});
document.getElementById('rnd').addEventListener('click',()=>{
  const value = Math.floor(Math.random() * 10); 
  //store.dispatch({type: 'RND',value});
  store.dispatch(rnd(value));
});

const update = () => {
  document.getElementById('counter').textContent = store.getState();
}
store.subscribe(update);
