
//menu получаем с сервера. items - формируем динамчески (напр. в корзине)
const initialState = {
    menu: [],
    loading:true,
    error:false, 
    items: []
}

// чтобы не указывать в каждом кейсе все поля, которые не будем изменять, сначала вернем предыдущий стейт с рест оператором ...state
// case 'MENU_LOADED':
//             return {
//                  menu: state.menu, //обязательно должны указать. Иначе исчезнетю. Так работает reducer
  //               loading:true,
 //                error:state.error
//             };
// из reducer должны вернуть объект со всеми полями. Если поле не указать, оно исчезнет. Так работает reducer. Поэтому сначала возвращаем тот стейт, кот. был изначально
const reducer = (state = initialState, action) => {
    //console.log(state);// предыдущий стейт
    switch(action.type){
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading:false,
             };
        case 'MENU_REQUSTED':
             return {
                ...state,
                 loading:true,
            };
        case 'MENU_ERROR':
            return {
                    ...state,
                    error:true
                };
        case 'ITEM_ADD_TO_CART':
        {
            const id = action.payload; // получаем id добавляемого объекта
            //console.log(id);
            const cartItem = state.items.find(cartItem => cartItem.id === id);// ищем его в корзине
            const count = cartItem? cartItem.count+1: 1;
           
            const item = state.menu.find(item => item.id === id); // ищем его в меню
            const newItem = {//cоздаем новый объект на остновании найденного
                title:item.title,
                price:item.price,
                url:item.url,
                id:item.id,
                count:count
            };
            const cartItemIndex = state.items.findIndex(cartItem => cartItem.id === id); // ищем его индекс в корзине
            //если не нашли в карзине
            if(cartItemIndex === -1){

                return{
                    ...state,
                    //мы должны поместить newItem в items
                     //сначала засунем все items которые были в state. Потом добавим новый объект
                     items: [
                     ...state.items,
                     newItem
                 ]
                }
            }
            return {
                ...state,
                 //мы должны удалить элемент из массива не нарушая принципов иммутабельности чтобы обновился state и header с total price
                 // ...state.items.slice(0,ind) - все элементы от 0 до исключаемого
                 //...state.items.slice(ind +1 ) - после исключаемого
                 items: [
                    ...state.items.slice(0,cartItemIndex),
                    ...state.items.slice(cartItemIndex +1 ),
                    newItem
                ]
            };
        }
        case 'ITEM_REMOVE_FROM_CART':
        {
            const id = action.payload; // получаем id удаляемого объекта
            const itemIndex = state.items.findIndex(item => item.id === id); // ищем его индекс в корзине
            //console.log(itemIndex);
            if(itemIndex === -1)
                return {...state};
            return{
                ...state,
                 //мы должны удалить элемент из массива не нарушая принципов иммутабельности 
                 // ...state.items.slice(0,ind) - все элементы от 0 до исключаемого
                 //...state.items.slice(ind +1 ) - после исключаемого
                 items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex +1 )
                ]
            }
        }
        default:
            return state;
    }
}
export default reducer;