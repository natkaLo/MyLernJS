import React from 'react';
import {connect} from 'react-redux';
//import {inc, dec, rnd} from '../actions';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
//создаем компонент react. Заберем код из index.html. Убираем id и в реакте не используется слово class. Заменяем на className 
//в качестве пропсов компонет получает counter, inc, dec, rnd (значение счетчика и ф-ции, которые будут срабатывать при клике)
// он ничего не знает о логике
const Counter = ({counter, inc, dec, rnd}) => {
    return(
        <div className="jumbotron">
            <h1>{counter}</h1>
            <button onClick={dec} className="btn btn-primary">DEC</button>
            <button onClick={inc} className="btn btn-primary">INC</button>
            <button onClick={rnd} className="btn btn-primary">RND</button>
        </div>
    )
}
//ф-ции для создания конфигурации 
//перевод cтайта в пропсы
//возвращает объект
const mapStateToProps = (state) => {
    return {
        counter: state
    }
}
//перевод функций в пропсы
//возвращает объект
// const mapDispatchToProps = (dispatch) => {
   
//     return {
//         //inc: () => dispatch ({type: 'INC'})
//         //после подключения actions.js
//         inc: () => dispatch(inc()),
//         dec: () => dispatch(dec()),
//         rnd: () => {
//             const value = Math.floor(Math.random() * 10); 
//             dispatch(rnd(value))
//         }
//     }
// }
// после import {bindActionCreators} from 'redux'; и import * as actions from '../actions';
// const mapDispatchToProps = (dispatch) => {

//     return bindActionCreators(actions,dispatch);
//     //изменили в actions.js получение rnd прямо там. Поэтому получается, что возвращаем тот же объект, поэтому напишем так как сверху
//     // const {inc,dec,rnd} = bindActionCreators(actions,dispatch);
//     // return {
//     //     inc,
//     //     dec,
//     //     rnd
    
//     // }
// }
//если у нас нет сложных ф-ций нам не надо mapDispatchToProps a просто вернем actions
//export default connect(mapStateToProps,mapDispatchToProps) (Counter);
export default connect(mapStateToProps,actions) (Counter);