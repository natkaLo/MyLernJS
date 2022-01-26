import React, {useState, useEffect} from 'react';
import './itemList.css';

import Spinner from '../spinner';
//getData, onItemSelected,renderItem} приходят как аргументы с верхнего уровня
 function ItemList({getData, onItemSelected,renderItem}){

    const [itemList, updateList] = useState([]); // изначально itemList ставим пустой массив
    //useEffect может иметь второй аргумент, который говорит о том, что ф-цию (первый аргумент) нужно выполнять только когда второй аргумент изменился
    // но это работает только для примитивов. Если напишем [ItemList]- не сработает и будет постоянный запрос на сервер
    // чтобы ф-цию (первый аргумент) срабатывала только при появлении и исчезновении компонента в качестве второго аргумента нужно передать пустой массив
    useEffect(()=>{
        getData()                      // вызов getData() т.е вызов this.gotService.getAllCharacters
        .then((data) =>{
                updateList(data)
            })
         
    }, [])
    

    function renderItems(arr){
        return arr.map((item)=>{
            const{id} = item; //вытащим из item переменную id
            const label = renderItem(item);// передали функцию в качестве пропсов с верхнего уровня (из characterPage.js renderItem = {(item) => item.name}). Отсюда передали в ф-цю item, ф-ция вернула name 
            return(
                <li 
                    key = {id}
                    className="list-group-item"
                    onClick={()=>onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if(!itemList){
         return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
         <ul className="item-list list-group">
             {items}
         </ul>
     );
    
}
export default ItemList;
