import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

// можно писать так. Обязательно внутренние элементы должны быть в обертке (<div> в данном случае)
// const elem = (
//   <div>
//       <h2>Hello World?</h2>
//       <input type="text" placeholder='Type here'/>
//       <button/>
//   </div>
// )
//ReactDOM.render(elem,  document.getElementById('root'));
// c компонентами

//создаем компоненты
//обязательно с большой буквы
const Header = () =>{
   // const src = "<script>alert('Error')</script>";// вредоносный скрипт
    //return <h2>{src}</h2> //вредоносный скрипт не запуститься, выведется просто строка <script>alert('Error')</script>
    return  <h2>Hello World?</h2>
}

const Field = () =>{
    const holder = "Enter here";
    //return  <input type="text" placeholder='Type here'/>

  //например стили
  const styledField = {
    width: '300px'
  }

    return  <input 
            style ={styledField}
            type="text" 
            placeholder={holder} 
            autoComplete='' 
            className='first'
            htmlFor = ""/>
}

const Btn = () =>{
  const text = "Log in";
  const res = () =>{
      return 'Log in, please';
  }
  const p = <p>Log In</p>
  //return   <button>{text}</button>
  //return   <button>{res()}</button>
  //return   <button>{p}</button>

 // объекты мы не можем помещать внутрь реакт абъектов

  //return   <button>{3+6}</button>

  const logged = true;
  // должны использовать тернарный оператор
  return   <button>{logged?"Enter":text}</button>
}
//ф-ция компонент, которая будет объеденять все наши компоненты. Обязательно обернуть (в div в данном случае)
const App = () =>{
    return (
      <div>
        <Header/>
        <Field/>
        <Btn/>
      </div>
  )
}

ReactDOM.render(<App/>,  document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
