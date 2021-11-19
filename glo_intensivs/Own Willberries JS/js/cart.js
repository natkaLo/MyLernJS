const cart = function(){
    const cartBtn = document.querySelector('.button-cart');
    const cart = document.querySelector('#modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
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
};
cart();