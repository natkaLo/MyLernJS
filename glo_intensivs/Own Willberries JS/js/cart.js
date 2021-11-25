const cart = function(){
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.querySelector('#modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
    const goodsContainer = document.querySelector('.long-goods-list');
    const cartTable = document.querySelector('.cart-table__goods');
    const modalForm = document.querySelector('.modal-form');
    const customerData = modalForm.querySelectorAll('.modal-input');
    

    // cartBtn.onclick = function(){
    //     console.log("click");
    // };
    //console.dir(cartBtn);
    //console.dir(cart);


    //addEventListener - лучше, чем cartBtn.onclick - на onclick можно повесить только одну функицию, 
    //а на addEventListener сколько угодно
    // cartBtn.addEventListener('click', function(){
    //     console.log("click1");
    // });

    const addToCart = (id)=>{
          //получим из localStorage наш массив товаров 
          const goods = JSON.parse(localStorage.getItem('goods'));
          // console.log(goods);
           //найдем кликнутую карточку
           const clickedGood = goods.find(good => good.id === id);
           //console.log(clickedGood);
           //найденный элемент нужно сложить в новый массив в localStorage. Если он там есть - получим, нет - создадим пустой массив
           const cart = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
           //console.log(cart);
           //переберем карзину товаров и поищем кликнутый товар методом some
           if(cart.some(good => good.id === clickedGood.id))    //если такой товар в корзине уже есть
           {
               //увеличить кол-во товара clickedGood
               cart.map(good => {
                   if(good.id === clickedGood.id)
                   {
                       good.count++;
                   }
                   return good;
               });
             
           }
           else{
                // добавить clickedGood в корзину
                clickedGood.count = 1;
                cart.push(clickedGood);
           }
           //запишем карзину в localStorage по ключем cart
           localStorage.setItem('cart', JSON.stringify(cart));
    };
    const deleteCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.filter(good => {
            return good.id !==id;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };
    const plusCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));
         //увеличить кол-во товара clickedGood

         const newCart = cart.map(good => {
            if(good.id === id)
            {
                good.count++;
            }
            return good;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };
    const minusCartItem = (id) =>{
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.map(good => {
            if(good.id === id && good.count > 0)
            {
                good.count--;
            }
            return good;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    };

    const renderCartGoods = (goods) =>{
        //console.log(goods);
        //очистим cartTable
        cartTable.innerHTML ='';
        goods.forEach(good=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${good.name}</td>
			    <td>${good.price}$</td>
				<td><button class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class=" cart-btn-plus"">+</button></td>
				<td>${+good.count * +good.price}$</td>
				<td><button class="cart-btn-delete"">x</button></td>
            `;
            cartTable.append(tr);

            tr.addEventListener('click',(event)=>{
                if(event.target.classList.contains('cart-btn-minus'))
                {
                    minusCartItem(good.id);
                }
                else if(event.target.classList.contains('cart-btn-plus'))
                {
                    plusCartItem(good.id);
                }
                else if(event.target.classList.contains('cart-btn-delete'))
                {
                    deleteCartItem(good.id);
                    
                }
            });
        });
    };
    //отправка данных из формы
    const sendForm = ()=>{
        const cartArr = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
    
        //отправляем форму на тестовое api
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method : 'POST',
            body : JSON.stringify({
                cart:cartArr,
                name: customerData[0].value,
                phone : customerData[1].value
            })
            }).then(() => {
                cart.style.display = '';
                //очистим обект корзины в local storage
                localStorage.removeItem('cart');
        });
    };
    modalForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        sendForm();
       
    });
    cartBtn.addEventListener('click', function(){
        //onsole.log("click");
        //достаем из localStorage массив с заказанными товарами
        const cartArray = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
        renderCartGoods(cartArray);
        //открываем модалное окно с корзиной
        cart.style.display = 'flex';
    });
     //закрытие модального окна по клику на кнопку close
    closeBtn.addEventListener('click', function(){
        //onsole.log("click");
        //закрываем модалное окно с корзиной
        cart.style.display = '';
    });
    //закрытие модального окна по клику мимо него (и проверка что кликнули не по удалить товар)
    cart.addEventListener('click',(event)=>{
        if(!event.target.closest(".modal") && event.target.classList.contains('overlay'))
        {
            cart.style.display = '';
        }
    });
     //закрытие модального окна по ESc
     window.addEventListener('keydown', (e)=>{
        if(e.key ==='Escape'){
            cart.style.display = '';
        }
     });
    if(goodsContainer)
    {
        goodsContainer.addEventListener('click',(e)=>{
            e.preventDefault();
            const buttonToCart = e.target.closest('.add-to-cart');  //closeset - поднимается наверх по элементам, содержащим кликнутый элемент и ищет класс
            if(buttonToCart)      
            {
                //console.log(buttonToCart);
                //получим id товара
                const goodId = buttonToCart.dataset.id;
                //console.log(goodId);
                 addToCart(goodId);
                
            }
        });
    }

};
cart();