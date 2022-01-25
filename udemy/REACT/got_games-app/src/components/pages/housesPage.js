import React, { Component }  from "react";
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import ErrorMessage from "../errorMessage";
import RowBlock from '../RowBlock'

export default class HousesPage extends Component{
    state = {
        selectedItem: null,
        error: false
    }
   
    onItemSelected = (id) =>{
        this.setState({selectedItem:id})
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
            getData = {getAllPageDataProps}// Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
            //паттерн - рендер функция - позволяет коттролировать - что именно отображать в наших компонентах
            //renderItem = {(item) => item.name} //паттерн - рендер функция. передаем ее в качестве пропсов в ItemList. возмет те данные которые нам интересны из item листа и выведет их. Получает какой-то объект item и возвращает item.name
           // renderItem = {(item) => `${item.name}(${item.gender})`}//Получает какой-то объект item и возвращает item.name и gender
           //сразу вытащим name и gender
           renderItem = {({name}) =>`${name}` }
            />
        )
       
        const itemDetails = (
            //передаем внутрь ItemDetails несколько компонентов, которые будут использованы им в виде пропсов//передаем в props.children
            // в Field передаем в качестве пропсов field и label
           
            <ItemDetails itemId = {this.state.selectedItem}
          
            getData = {getSelPageDataProps}// Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
            >
                <Field field = 'region' label = 'Region'/>
                <Field field = 'words' label = 'Words'/>
                <Field field = 'titles' label = 'Titles'/>
                <Field field = 'overlord' label = 'Overlord'/>
                <Field field = 'ancestralWeapons' label = 'AncestralWeapons'/>
            </ItemDetails>
        )

        return (
          <RowBlock left = {itemList} right = {itemDetails}/>
        )

    }
}
