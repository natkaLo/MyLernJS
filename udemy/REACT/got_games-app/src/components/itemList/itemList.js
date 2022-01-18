import React, {Component} from 'react';
import './itemList.css';
//import GotService from '../../services/gotService';  - нужен без паттернов
import Spinner from '../spinner';

export default class ItemList extends Component {

   // gotService = new GotService(); - нужен без паттернов
    state = {
        itmeList:null
    }
    componentDidMount(){
        const {getData} = this.props; // передаем в качестве пропсов с верхнего уровня
        getData()
        .then((itmeList) =>{
            this.setState({
                itmeList
            })
        })
    }

    renderItems(arr){
        return arr.map((item,i)=>{
            return(
                <li 
                    key = {i}
                    className="list-group-item"
                    onClick={()=>this.props.onCharSelected(41 + i)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {
        const {itmeList}= this.state;
        if(!itmeList){
            return <Spinner/>
        }

        const items = this.renderItems(itmeList);

        return (
            <ul className="item-list list-group">
              {items}
            </ul>
        );
    }
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