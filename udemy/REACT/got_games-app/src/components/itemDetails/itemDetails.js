import React, {Component} from 'react';
import './itemDetails.css';

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
export default class ItemDetails extends Component {
    //данные (персонаж или дом или книга). Изначально null
    state = {
        item:null
    }
    componentDidMount(){
        this.updateItem();
    }
    componentDidUpdate(prevProps){
        //console.log(this.props.itemId);
        //всегда надо проверять текущие пропорти с пришедшими
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }
    // чтобы данные появились
    updateItem(){
       const{itemId}= this.props;
        if(!itemId){
            return;
        }
       const {getData} = this.props; // передаем функцию в качестве пропсов с верхнего уровня (из characterPage.js  getData = {this.gotService.getAllCharacters})
        
        getData(itemId)     
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
      
       // console.log(item);
        const{name}= item;
       // console.log(name);
        //this.props.children - поместим все компоненты, которые были переданы cвыше (characterPage.js charDetails
        //  <Field field = 'gender' label = 'Gender'/>
        // <Field field = 'born' label = 'Born'/>)
        return (
            <div className="item-details rounded">
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