
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
            const id = action.payload; // получаем id добавляемого объекта
            //console.log(id);
            const item = state.menu.find(item => item.id === id); // ищем его в меню
            const newItem = {//cоздаем новый объект на остновании найденного
                title:item.title,
                price:item.price,
                url:item.url,
                id:item.id
            };
            return {
                 ...state,
                 //мы должны поместить newItem в items
                 //сначала засунем все items которые были в state. Потом добавим новый объект
                items: [
                    ...state.items,
                    newItem
                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const ind = action.payload; // получаем индекс удаляемого объекта
            const itemIndex = state.items.findIndex(item => item.id === ind); // ищем его в корзине
            //console.log(itemIndex);
            return{
                ...state,
                 //мы должны удалить элемент из массива не нарушая принципов иммутабельности 
                 // ...state.items.slice(0,ind) - все элементы от 0 до исключаемого
                 //...state.items.slice(ind +1 ) - после исключаемого
                 items: [
                    ...state.items.slice(0,ind),
                    ...state.items.slice(ind +1 )
                ]
            }
        default:
            return state;
    }
}
export default reducer;