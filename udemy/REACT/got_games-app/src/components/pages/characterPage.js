import React, { Component }  from "react";
//import {Col, Row, Container} from 'reactstrap';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import RowBlock from '../RowBlock'

export default class CharacterPage extends Component{
    
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
        const {getAllPageDataProps} = this.props; //передали сюда в качестве пропсов из app.js (getDataProps = {this.gotService.getAllCharacters} )
        const {getSelPageDataProps} = this.props; //передали сюда в качестве пропсов из app.js (getDataProps = {this.gotService.getCharacter} )
        const itemList = (
            <ItemList onItemSelected = {this.onItemSelected}
                        getData = {getAllPageDataProps} // Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
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
                getData = {getSelPageDataProps} // Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
            >
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