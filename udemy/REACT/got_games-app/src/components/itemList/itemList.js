import React, {Component} from 'react';
import './itemList.css';
//import GotService from '../../services/gotService';  - нужен без паттернов
import Spinner from '../spinner';
import PropTypes from 'prop-types';

export default class ItemList extends Component {

    state = {
        itemList:null
    }
    componentDidMount(){
        const {getData} = this.props; // передаем функцию в качестве пропсов с верхнего уровня (из characterPage.js  getData = {this.gotService.getAllCharacters})
        getData()                      // вызов getData() т.е вызов this.gotService.getAllCharacters
        .then((itemList) =>{
            this.setState({
                itemList
            })
            // if(itemList){
            //     const{id} = itemList[0]; //вытащим из item переменную id
            //     this.props.onItemSelected(id);
            // }
        })
    }

    renderItems(arr){
        return arr.map((item)=>{
            const{id} = item; //вытащим из item переменную id
            const label = this.props.renderItem(item);// передали функцию в качестве пропсов с верхнего уровня (из characterPage.js renderItem = {(item) => item.name}). Отсюда передали в ф-цю item, ф-ция вернула name 
            return(
                <li 
                    key = {id}
                    className="list-group-item"
                    onClick={()=>this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList}= this.state;
        if(!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
              {items}
            </ul>
        );
    }
}
//пропсы по-умолчанию. Принимают в себя объект. Если не были передана ф-ция onItemSelected в качестве пропса из housesPage.js или другого
ItemList.defaultProps = {
    onItemSelected: () => {}

}
//getData: PropTypes.arrayOf(PropTypes.object) //должен быть массив объектов
ItemList.propTypes = {
    onItemSelected:PropTypes.func
   
}


// без паттернов
// export default class ItemList extends Component {

//     gotService = new GotService();
//     state = {
//         charList:null
//     }
//     componentDidMount(){
//         this.gotService.getAllCharacters()
//         .then((charList) =>{
//             this.setState({
//                 charList
//             })
//         })
//     }

//     renderItems(arr){
//         return arr.map((item,i)=>{
//             return(
//                 <li 
//                     key = {i}
//                     className="list-group-item"
//                     onClick={()=>this.props.onCharSelected(41 + i)}>
//                     {item.name}
//                 </li>
//             )
//         })
//     }

//     render() {
//         const {charList}= this.state;
//         if(!charList){
//             return <Spinner/>
//         }

//         const items = this.renderItems(charList);

//         return (
//             <ul className="item-list list-group">
//               {items}
//             </ul>
//         );
//     }
// }