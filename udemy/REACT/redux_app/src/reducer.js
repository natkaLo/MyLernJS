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
export default reducer;