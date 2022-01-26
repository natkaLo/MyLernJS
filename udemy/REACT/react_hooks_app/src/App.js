import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
//хуки можно использовать только в функциях (нельзя в классах). нельзя их использовать в условиях, циклах или др.
//их можно использовать на самом верхнем уровне
function App() {
//деструкторизация массива, который возвращает useState. Первое - значение, второе - функция
  const [count, setCount] = useState(0);// 0 - начальное состояние (это сount)
  //еще одно состояние, которое мы инициализируем массивом объектов, где уже есть один объект (это data)
  const [data, refreshData] = useState([{name: 'Ivan', sex: 'Male'}]);

  //хук useeffect вызывается каждый раз после того, как обновиться дом. Сообщает о том, что react что-то должен сделать после отрисовки
  //как аргумент передаем фукцию
  useEffect (() => {
    //console.log(Math.random());
    //console.log(data);
    // updateChar();
    // let timerId = setInterval(updateChar,15000);
    // //фунция возвращает чт-то имитируя componentWillUnmount
    // return () => {
    //   clearInterval(timerId);
    // }
  });
  return (
    <div>
      <p> Вы кликнули {count} раз</p>
      <button
      onClick={()=>setCount(count + 1)}> Кликни меня </button>
    {data.map(item => {
        return (
          <div>
            Name: {item.name}, sex: {item.sex}
          </div>
        );
      })}
      <button 
        onClick={()=>refreshData(data=>([...data,{name: 'Alex', sex: 'Male'}]))} //иммутабельность стейта. В 
        >
        Добавить данные
      </button>
    </div>
   
  );
}

export default App;
