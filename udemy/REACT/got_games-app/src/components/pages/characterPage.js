import React, { Component }  from "react";
//import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import GotService from '../../services/gotService';
import RowBlock from '../RowBlock'



export default class CharacterPage extends Component{
    
    gotService = new GotService();
    state = {
        //selectedChar:130,
        selectedChar: null,
        error: false
    }
   
    onItemSelected = (id) =>{
        this.setState({selectedChar:id})
    }

    componentDidCatch(){
       this.setState({error: true})
    }

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList onItemSelected = {this.onItemSelected}
            getData = {this.gotService.getAllCharacters} // это не вызов ф-йи (нет круглых скобок), а передаем ее в качестве пропсов в ItemList. Он ее и вызывает
            //паттерн - рендер функция - позволяет коттролировать - что именно отображать в наших компонентах
            //renderItem = {(item) => item.name} //паттерн - рендер функция. передаем ее в качестве пропсов в ItemList. возмет те данные которые нам интересны из item листа и выведет их. Получает какой-то объект item и возвращает item.name
           // renderItem = {(item) => `${item.name}(${item.gender})`}//Получает какой-то объект item и возвращает item.name и gender
           //сразу вытащим name и gender
           renderItem = {({name,gender}) =>`${name}(${gender})` }
            />
        )
       
        const itemDetails = (
            //передаем внутрь ItemDetails несколько компонентов, которые будут использованы им в виде пропсов//передаем в props.children
            // в Field передаем в качестве пропсов field и label
           
            <ItemDetails itemId = {this.state.selectedChar}
          
            getData = {this.gotService.getCharacter}>
                <Field field = 'gender' label = 'Gender'/>
                <Field field = 'born' label = 'Born'/>
                <Field field = 'died' label = 'Died'/>
                <Field field = 'culture' label = 'Culture'/>
            </ItemDetails>
        )

        return (
          <RowBlock left = {itemList} right = {itemDetails}/>
        )

    }
}
//без паттернов
// export default class CharacterPage extends Component{
    
//     state = {
//        // selectedChar:null,
//         selectedChar: 130,
//         error: false
//     }
   
//     onCharSelected = (id) =>{
//         this.setState({selectedChar:id})
//     }

//     componentDidCatch(){
//        this.setState({error: true})
//     }

//     render(){
//         if(this.state.error){
//             return <ErrorMessage/>
//         }
//         return (
//             <Row>
//             <Col md='6'>
//                 <ItemList onCharSelected = {this.onCharSelected}/>
//             </Col>
//             <Col md='6'>
//                 <CharDetails charId = {this.state.selectedChar}/>
//             </Col>
//             </Row>
//         )

//     }
// }