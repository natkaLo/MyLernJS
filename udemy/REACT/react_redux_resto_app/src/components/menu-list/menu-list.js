import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequsted, menuError, addedToCart} from '../../actions'
import Spinner from '../spinner'

import './menu-list.scss';


class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequsted(); 
        const {RestoService} = this.props; //из WithRestoService RestoService = {RestoService}
        //получаем данные с сервера (RestoService)
        // результат мы должны отправить в наш стор. мы должны их поместить в reducer (reducers index.js) initialState
        RestoService.getMenuItems()
        .then(res => {
            //console.log(res);
            this.props.menuLoaded(res);
        })
        .catch( this.props.menuError())
        
    }

//menuItem => { - колбек ф-ция,  key={menuItem.id} - нужен key  menuItem = {menuItem} - пропсы передаем в менюitem
//передаем в MenuListItem полученную из пропсов ф-цию addedToCart в качестве обработчика события onClick
//передаем в onAddToCart анонимную стрелочную ф-цию onAddToCart = {() => addedToCart(menuItem.id)} 
    render() {
        const {menuItems,loading, addedToCart} = this.props;
        if(loading){
            return <Spinner/>
        }
        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem 
                                key={menuItem.id} 
                                menuItem = {menuItem}
                                onAddToCart = {() => addedToCart(menuItem.id)} 
                                />
                    })
                }
            </ul>
        )
    }
};
//connect соеденяет наш menuList с redux
//ф-ции для создания конфигурации  connect
//перевод cтайта в пропсы
//state - аргумент (наше текущее состояние)
//возвращает объект
//получаем menuItems из index.js папки reducers const initialState = { menu: []
//этот menuItems в виде пропса придет в MenuList (const {menuItems} = this.props;) и его же мы используем для построения MenuListItem
const mapStateToProps = (state) => {
    return {
        menuItems : state.menu,
        loading :state.loading,
        error: state.error
    }
} 
// мы должны сказать MenuList какой action он должен уметь диспатчить 
//ф-ция принимает аргумент dispatch. Ф-ция возвращает объект, внутри которого мы должны создать свойство, которое будем использовать внутри компонента MenuList
//создали свойство menuLoaded. Будем передавать в него новое меню (newMenu). Это для того, чтобы когда мы получим данные с сервера, мы вызовем метод, который отправит данные в стор
// const mapDispatchToProps = (dispatch) => {
//     return{
//             menuLoaded: (newMenu) => {
//                 //засовываем объект
//                 //берем из reducers index.js
//                 dispatch({
//                     type: 'MENU_LOADED',
//                     payload:newMenu
//                 })
//         }
//     }
// } 
// после import {menuLoaded} from '../../actions'
// const mapDispatchToProps = (dispatch) => {
//     return{
//             menuLoaded: (newMenu) => {
//                 //засовываем объект
//                 //берем из reducers index.js
//                 dispatch(menuLoaded(newMenu))
//         }
//     }
// } 
//проще connecty передадим actionCreatera и connect все сделает за нас
const mapDispatchToProps ={
    menuLoaded,
    menuRequsted,
    menuError,
    addedToCart
};
//обернем еще connect в WithRestoService для работы с консюмером
export default WithRestoService()(connect (mapStateToProps,mapDispatchToProps)(MenuList));