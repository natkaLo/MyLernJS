import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
//в качестве пропсов приходят items
const AppHeader = ({items}) => {
    let totalPrice = 0;
    items.forEach(element => {
        totalPrice += element.price*element.count;
    });
    return (
        <header className="header">
             <Link to = '/' >
                 <div className="header__link" href="#">Menu</div> 
            </Link>
             <Link to = '/cart' >
                <div className="header__link" href="#">
                    <img className="header__cart" src={cartIcon} alt="cart"></img>
                    Total: {totalPrice} $
                </div>
            </Link>
           
        </header>
    )
};
//возвращаем объект и ключ и значение items
const mapStateToProps = ({items}) => {
    return {
        items
    }
};
export default connect(mapStateToProps)(AppHeader);

