import React, { Component }  from "react";
import ItemList from '../itemList';
import ErrorMessage from "../errorMessage";
import GotService from '../../services/gotService';
import { useParams } from "react-router-dom";
//import {withRouter} from 'react-router-dom'


export default class BooksPage extends Component{
        
    gotService = new GotService();

    state = {
       error: false
    }
   componentDidCatch(){
       this.setState({error: true})
    }

    yourFunctionHere(itemId)
    {
        this.props.navigate(`/books/${itemId}`)
    }

     render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
       
     return (
            <ItemList 
            
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
// Wrap and export
// const withRouter = WrappedComponent => props => {
//    const params = useParams();
//    // etc... other react-router-dom v6 hooks
 
//    return (
//      <WrappedComponent
//        {...props}
//        params={params}
//        // etc...
//      />
//    );
//  };
//export default withRouter(BooksPage);
