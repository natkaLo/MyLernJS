import React, { Component }  from "react";
import ItemDetails,{Field} from '../itemDetails';


export default class BooksItem extends Component{
   render() {
        const {getSelPageDataProps} = this.props; //передали сюда в качестве пропсов из app.js (getDataProps = {this.gotService.getBook} )
        return (
            <ItemDetails itemId = {this.props.bookId}
            getData = {getSelPageDataProps}// Передаем в itemList функцию в качестве пропсов, которую передали сюда свыше
            >
                <Field field = 'numberOfPages' label = 'NumberOfPages'/>
                <Field field = 'publiser' label = 'Publiser'/>
                <Field field = 'released' label = 'Released'/>
            </ItemDetails>
        )
    }

}