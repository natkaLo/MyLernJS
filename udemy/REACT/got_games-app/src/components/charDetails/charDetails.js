import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';

//компонент 
//item - это объект.  - {item[field]} - вытащили из него значение поля. label - подпись для поля
const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
        </li>
    )
} 
export {
    Field
}
export default class CharDetails extends Component {

    gotService = new GotService();
    //персонаж. Изначально null
    state = {
        item:null
    }
    componentDidMount(){
        this.updateChar();
    }
    componentDidUpdate(prevProps){
        //всегда надо проверять текущие пропорти с пришедшими
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }
    // чтобы персонаж появился
    updateChar(){
        const{charId}= this.props;
        if(!charId){
            return;
        }
        this.gotService.getCharacter(charId)
        .then((item) =>{
            this.setState({item})
        })
       // this.foo.bar = 0; // сделаем какая - то ошибка
    }

    render() {
        if(!this.state.item){
            return (
                <span className = 'select-error'>Please select a character</span>
            )
        }
        const {item} = this.state; // получаем объект из state
        const{name}= item;
        //this.props.children - поместим все компоненты, которые были переданы cвыше (characterPage.js charDetails
        //  <Field field = 'gender' label = 'Gender'/>
        // <Field field = 'born' label = 'Born'/>)
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                {
                    //мы могли бы написать return this.props.children, но нам не был передан свыше объект item (самого персонажа)
                    // мы должны его добавить, поэтому:
                    //встроенный метод для перебора всех детей, которые есть в этом компоненте
                    //параметр - this.props.children, второй параметр колбек ф-ция, которая что-то будет делать с нашими элемнетами
                    // в качестве child может прийти и объект и массив и ф-ция
                    //нам нужно добавить в переданный свыше Field объект (const Field = ({item, field, label})) из нашего стейта
                    //напрямую добавит мы не можем типа Field.item = char, поэтому используем React.cloneElement()
                    // React.cloneElement(child) - получим клона Field переданного свыше
                    //React.cloneElement(child,{item}) - добавили в клона объект из нашего стейта
                    React.Children.map(this.props.children,(child) => {
                        return React.cloneElement(child,{item})
                    })
                }
                
               </div>
        );
    }
}

//без компонентов
// export default class CharDetails extends Component {

//     gotService = new GotService();
//     //персонаж. Изначально null
//     state = {
//         char:null
//     }
//     componentDidMount(){
//         this.updateChar();
//     }
//     componentDidUpdate(prevProps){
//         //всегда надо проверять текущие пропорти с пришедшими
//         if(this.props.charId !== prevProps.charId){
//             this.updateChar();
//         }
//     }
//     // чтобы персонаж появился
//     updateChar(){
//         const{charId}= this.props;
//         if(!charId){
//             return;
//         }
//         this.gotService.getCharacter(charId)
//         .then((char) =>{
//             this.setState({char})
//         })
//        // this.foo.bar = 0; // сделаем какая - то ошибка
//     }

//     render() {
//         if(!this.state.char){
//             return (
//                 <span className = 'select-error'>Please select a character</span>
//             )
//         }

//         const{name,gender,born,died,culture}= this.state.char;

//         return (
//             <div className="char-details rounded">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Gender</span>
//                         <span>{gender}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Born</span>
//                         <span>{born}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Died</span>
//                         <span>{died}</span>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between">
//                         <span className="term">Culture</span>
//                         <span>{culture}</span>
//                     </li>
//                 </ul>
//             </div>
//         );
//     }
// }