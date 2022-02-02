import React from 'react';
import {connect} from 'react-redux';
import './cart-table.scss';
import {deleteFromCart} from '../../actions'
//в качестве пропсов приходят items и обработчик onDelete
//const CartTable = ({items, onDelete}) => {
const CartTable = ({items, deleteFromCart}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title,price,url,id} = item;
                        return (
                            <div key = {id} className="cart__item">
                                <img src= {url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                             </div>
                        )
                    })
                }
              
            </div>
        </>
    );
};

//возвращаем объект и ключ и значение items
const mapStateToProps = ({items}) => {
    return {
        items
    }
};
//mapDispatchToProps может даже не получать dispatch как аргумент. Мы просто можем написать ф-цию, которая будет просто выполняться и не будет связана с диспетчем
//например вернем ф-цию onDelete, которая получает id в качестве аргумента
// <div onClick={() => onDelete(id)} className="cart__close">&times;</div>
// const mapDispatchToProps = () => {
//     return {
//         onDelete: (id) => {
//             console.log(`Удалили ${id}`);
//         }
//     }
// }
const mapDispatchToProps ={
    deleteFromCart
};
export default connect(mapStateToProps, mapDispatchToProps)(CartTable);