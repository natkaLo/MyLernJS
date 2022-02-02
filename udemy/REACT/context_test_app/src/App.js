import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper'
import MyContext from './components/Context';

// в MyContext лежат два объекта - Provider и Consumer
// все, что мы хотим передать ниже, должно быть с названием value
//  <MyContext.Provider value={'natka'}> - передаем просто строку
// <MyContext.Provider value={ {}}></MyContext.Provider> - объект
function App() {
  return (
    <div className="App">
        <MyContext.Provider value={
          {
            name: 'natka',
            lastName: 'Lo'
          }
        }>
            <Wrapper/>
        </MyContext.Provider>
    </div>
  );
}

export default App;
