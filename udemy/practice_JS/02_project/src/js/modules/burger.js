const burger = (menuSelector, burgerSelector) => {

    const   menuElement = document.querySelector(menuSelector),
            burgerElement = document.querySelector(burgerSelector);

    //чтобы изначально меню точно было скрыто
    menuElement.style.display = 'none';
    burgerElement.addEventListener('click', () => {
        console.log(window.screen.availWidth);
        // елси меню скрыто, покажем и наобороь и если ширина окна  window.screen.availWidth меньше 993
        if(menuElement.style.display == 'none' && window.screen.availWidth < 993) { 
            menuElement.style.display = 'block';
        }
        else{
            menuElement.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if(menuElement.style.display == 'block' && window.screen.availWidth >= 993) {
            menuElement.style.display = 'none';
        }
    });
};
export default burger;