import React, {Component} from "react";
import './post-add-form.css';

//формат функции. Но нам нужно хранить внутреннее состояние (свой state), поэтому нам нужен класс. При этом нужно импортировать Component
// const PostAddForm = ({onAdd}) => {
//     return (
//         <form className="bottom-panel d-flex">
//             <input
//                 type="text"
//                 placeholder="О чем вы думаете сейчас?"
//                 className="form-control new-post-label"
//             />
//             <button 
//                 type="submit"
//                 className="btn btn-outline-secondary"
//                 onClick = {() => onAdd('Hello')}>
//                 Добавить</button>
//         </form>
//     )
// }

// export default PostAddForm;
 export default class PostAddForm extends Component{
     constructor (props){
         super (props);
         this.state = {
             text: ''
         }

         this.onValueChange = this.onValueChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }
     onValueChange(event){
        event.preventDefault();
        //console.log(event.target.value);
        this.setState({
            text: event.target.value
        })
     }
     onSubmit(event){
        event.preventDefault();
         this.props.onAdd(this.state.text)
         this.setState({
             text: ''
         })
     }
     render(){
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit} //onSubmit - cтандартный обработчик отправки формы Нужно вешать на форму
                >
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange = {this.onValueChange}
                    value = {this.state.text} // так делается контролируемый компоненент - он берет значение которое мы храним в классе
                />
                <button 
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить</button>
            </form>
        )

     }
}

