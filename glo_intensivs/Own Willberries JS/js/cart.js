const cart = function(){
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.querySelector('#modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
    const goodsContainer = document.querySelector('.long-goods-list');
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

    cartBtn.addEventListener('click', function(){
        //onsole.log("click");
        //открываем модалное окно с корзиной
        cart.style.display = 'flex';
    });
    closeBtn.addEventListener('click', function(){
        //onsole.log("click");
        //закрываем модалное окно с корзиной
        cart.style.display = '';
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
                //получим из localStorage наш массив товаров 
                const goods = JSON.parse(localStorage.getItem('goods'));
               // console.log(goods);
                //найдем кликнутую карточку
                const clickedGood = goods.find(good => good.id === goodId);
                console.log(clickedGood);
                //найденный элемент нужно сложить в новый массив
            }
        });
    }

};
cart();