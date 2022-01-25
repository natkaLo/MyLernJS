import React, { Component }  from "react";
import ItemList from '../itemList';
import ErrorMessage from "../errorMessage";
import { useNavigate } from 'react-router-dom';
//import {withRouter} from 'react-router-dom' //deprecated

// Wrap and export
const withRouter = BooksPage => props => {

   const {getAllPageDataProps} = props; //передали сюда в качестве пропсов из app.js (getDataProps = {this.gotService.getAllBooks} )
   const history = useNavigate();// etc... other react-router-dom v6 hooks
   return (
       <ItemList  onItemSelected = {(itemId) => {
            //console.log(itemId);
            //history(`/books/${itemId}`); //полный путь если в header.js написан абсолюный путь <Link to = '/books' (как бы к файлу)
            //если написан относительный путь <Link to = '/books/' (как бы к папке) надо писать history(itemId);
            
            history(itemId);
         }}
         getData = {getAllPageDataProps} // Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
         //паттерн - рендер функция - позволяет коттролировать - что именно отображать в наших компонентах
         //renderItem = {(item) => item.name} //паттерн - рендер функция. передаем ее в качестве пропсов в ItemList. возмет те данные которые нам интересны из item листа и выведет их. Получает какой-то объект item и возвращает item.name
         // renderItem = {(item) => `${item.name}(${item.gender})`}//Получает какой-то объект item и возвращает item.name и gender
          //сразу вытащим name и gender
         renderItem = {({name}) =>`${name}` }
       />
   );
};

 class BooksPage extends Component{
    state = {
       error: false
    }
   componentDidCatch(){
       this.setState({error: true})
    }

  
    render() {
      if(this.state.error){
          return <ErrorMessage/>
       }
       return(
         <withRouter {...this.props} />
       )
    }
}


export default withRouter(BooksPage);
//export default withRouter(BooksPage);
