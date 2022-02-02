//newMenu - новые данные. Поместиться в payload и после этого в редюсере можно установить его в новый стайт
const menuLoaded = (newMenu) => {
    return{
        type:'MENU_LOADED',
        payload:newMenu
    }
}
const menuRequsted = () => {
    return{
        type:'MENU_REQUSTED'
    }
}
const menuError = () => {
    return{
        type:'MENU_ERROR'
    }
}

const addedToCart = (id) => {
   // console.log(id);
    return{
        type:'ITEM_ADD_TO_CART',
        payload: id
    }
}
const deleteFromCart = (id) => {
    return{
        type:'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}
export{
    menuLoaded,
    menuRequsted,
    menuError,
    addedToCart,
    deleteFromCart
};