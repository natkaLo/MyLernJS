import React, { Component }  from "react";
import ItemList from '../itemList';
import ErrorMessage from "../errorMessage";
import GotService from '../../services/gotService';
import { useNavigate } from "react-router-dom";
//import {withRouter} from 'react-router-dom'

const Home = (itemId) => {
    console.log(itemId);
  //  const navigate = useNavigate();
    //this.props.history.push(`/books/${itemId}`);
}
 export default class BooksPage extends Component{
        
    gotService = new GotService();

    state = {
       error: false
    }
   componentDidCatch(){
       this.setState({error: true})
    }
     render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
     return (
            <ItemList 
            onItemSelected =  {(itemId)  => Home(itemId)}
             getData = {this.gotService.getAllBooks} // это не вызов ф-йи (нет круглых скобок), а передаем ее в качестве пропсов в ItemList. Он ее и вызывает
                //паттерн - рендер функция - позволяет коттролировать - что именно отображать в наших компонентах
                //renderItem = {(item) => item.name} //паттерн - рендер функция. передаем ее в качестве пропсов в ItemList. возмет те данные которые нам интересны из item листа и выведет их. Получает какой-то объект item и возвращает item.name
               // renderItem = {(item) => `${item.name}(${item.gender})`}//Получает какой-то объект item и возвращает item.name и gender
               //сразу вытащим name и gender
            renderItem = {({name}) =>`${name}` }
             />
         )
    }
}
//export default withRouter(BooksPage);
