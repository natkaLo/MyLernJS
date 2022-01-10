import React from "react";

import PostListItem from '../post list-item'
import {ListGroup} from "reactstrap";
import './post-list.css';


const PostList = ({posts, onDelete}) =>{

    const elements = posts.map((item) => {

        const{id, ...itemProps} = item; //id нам дальше не нужен, поэтому вытаскиваем его из объекта и передаем дальше без id

        return(
            <li key = {item.id} className = 'list-group-item'>
               <PostListItem 
                //label = {item.label} important={item.important}
                //{...item}//можно записать так - развернем объект item с помошью spret оператора (а так как значение и ключ совподают - их не пишем)
                 {...itemProps} 
                 onDelete={()=>onDelete(id)}
                 />
            </li>
        )
    });
    return (
        // <ul className = "app-list list-group">
        // {elements}
        // </ul>
        <ListGroup className = "app-list">
         {elements}
         </ListGroup>
    )

    // return(
    //     <ul>
    //        <PostListItem label = 'Going to Learn React' important/>
    //         <PostListItem label = 'This is so good'/>
    //         <PostListItem label = 'I need a break...'/>
    //     </ul>
    // )
}

export default PostList;