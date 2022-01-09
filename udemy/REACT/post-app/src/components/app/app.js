import React from "react";

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

const App = () =>{

    const data = [
        {label: 'Going to Learn React', important: true, id:'djfks'},
        {label: 'This is so good', important: false, id:'sjfsdk'},
        {label: 'I need a break...', important: false, id:'sjkfj'} 
    ];

    return(
       // <div className = {style.app}>
       // <div className = "app">
       //<StyledAppBlock>
        <AppBlock>
            <AppHeader/>
            <div className = "search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div> 
            <PostList posts = {data} />
            <PostAddForm/>
       
        </AppBlock>
    )
}
export default App;