import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

//пересекаются стили
import './app.css';
//import './test.css';
//применяем модули для css (название файла должно быть ....module.css)
//import style from './App.module.css';
import styled from 'styled-components';

//создание стилей cssinjs
const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
// если создаем cssinjs на основе существующего (наследование ) (добавляем какие-то стили)
const StyledAppBlock = styled(AppBlock)`
    background-color: grey;
`
//т.к react может что-то менять (работать динамически) только со state, нам нужно сделать класс
// а не просто const App = () =>{
// экспортируем класс по умолчанию
export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
             data : [
                {label: 'Going to Learn React', important: true, like: false, id:1},
                {label: 'This is so good', important: false, like: false, id:2},
                {label: 'I need a break...', important: false, like: false, id:3} 
            ],
            term : ``,             //строка поиска
            filter : `all`
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToogleImportant = this.onToogleImportant.bind(this);
        this.onToogleLiked = this.onToogleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }
    deleteItem(id){
       
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            // data.splice(index,1);   //splice - вырезает элемент 
            // return {
            //     data:data
            // }
            //напрямую изменять state нельзя (нельзя изменять свойства объекта - можно изменять только значение свойства).
            //т.к нельзя изменять state - создадим новый массив, содержащий все элементы старого, но без удаляемого
            // до элемента (slice копирует часть массива и создает новвый)
            //const before = data.slice(0,index);
            //после
            //const after = data.slice(index +1);
            //соеденяем массивы c помошью spret оператора (оператора разворота)
            //const newArr = [...before,...after];

            const newArr = [...data.slice(0,index), ...data.slice(index+1)];
            return{
                //помещаем в data новый массив
                data : newArr
             }
        });
    }
    addItem(body){
        //console.log(body);
        // нужно добавить в стате  элемент типа {label: 'I need a break...', important: false, id:3} 
        //генерация уникального id
        const newItem = {
            label : body,
            important: false,
            id: this.maxId++
        }
        //нужно поместить новый объект в state
        this.setState(({data})=>{
            //новый массив - из старого + новый объект
            const newArr = [...data,newItem];
            return {
                data : newArr
            }
        })
    }
    onToogleImportant(id) {
        //console.log(`important ${id}`);
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old,important: !old.important};// cпрет оператор развернет объект и перезапишет свойство
            // новый массив
            const newArr =[...data.slice(0,index), newItem,...data.slice(index+1)];
            return {
                data : newArr
            }
        })
    }
    onToogleLiked(id){
        //console.log(`liked ${id}`);
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old,like: !old.like};// cпрет оператор развернет объект и перезапишет свойство
            // новый массив
            const newArr =[...data.slice(0,index), newItem,...data.slice(index+1)];
            return {
                data : newArr
            }
        })
    }

    //поиск по постам
    //ф-ция вернет массив с постами, название которых будет содержать искомую строку
    searchPost(items, term){
        if(term.length === 0){
            return items;
        }
        //функция будет возвращать элемнеты, название которых будет содержать искомую строку
        return items.filter((item)=>{
            return item.label.indexOf(term) > -1;
        })
    }

    filterPost(items,filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }
        else{ //all
            return items
        }
    }

    onUpdateSearch(term){
        this.setState({term}) //term:term
    }

    onFilterSelect(filter){
        this.setState({filter})//filter:filter
    }

    //render вызывается после setState
    render (){
    const {data, term,filter} = this.state;// деструкторизация стейта
    // кол-во лайкнутых постов
    const liked = data.filter(item => item.like).length; //filter - возвращает новый массив
    //кол-во всех постов
    const allPosts = data.length;

    // - searchPost если в поле поиска ничего не введено - будут видимы все посты if(term.length === 0), если введено - только найденные посты
   // <PostList posts = {this.state.data} заменяем на  <PostList posts = {visiblePosts}
    const visiblePosts =this.filterPost(this.searchPost(data, term), filter);

    return(
            // <div className = {style.app}>
            // <div className = "app">
            //<StyledAppBlock>
            <AppBlock>
                <AppHeader
                    liked = {liked}
                    allPosts = {allPosts}
                />
                <div className = "search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch = {this.onUpdateSearch}/>
                    <PostStatusFilter 
                    filter = {filter}
                    onFilterSelect = {this.onFilterSelect}/>
                </div> 
                <PostList posts = {visiblePosts}
                onDelete = {this.deleteItem}
                onToogleImportant = {this.onToogleImportant} 
                onToogleLiked = {this.onToogleLiked}/>
                <PostAddForm
                onAdd = {this.addItem}/>
            </AppBlock>
        )
    }
}
