const images = () =>{
    const   imgPopup = document.createElement('div'),
            workSection = document.querySelector('.works'),
            bigImage = document.createElement('img');

    imgPopup.classList.add('popup'); //класс есть в css
    //поместим cозданный div на страницу в  элемент с классом.work
    workSection.appendChild(imgPopup);
    
    //изображение должно быть по центру
    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';
   
    imgPopup.appendChild(bigImage); //поместим cозданный img на страницу в  div
    
    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;
        
        if(target){
            if(target.classList.contains('preview')){//если пользователь кликнул в одну из картинок, а не куда-то между
                //покажем модальное окно
                 imgPopup.style.display = 'flex';
                 const path = target.parentNode.getAttribute('href');//получаем ссылку на большое изображение. Она записана у родителя в атрибуте href
                 bigImage.setAttribute('src',path);// устанавливаем путь к картинке в аттрибут к bigImage
                 document.body.style.overflow = "hidden"; //чтобы body под модальным окном не скролировался
            }
            else if(target.matches('div.popup')){//если пользователь кликнул на подложку нашего созданного div с классом popup
                //закрываем модальное окно
                imgPopup.style.display = 'none';
                document.body.style.overflow = ""; 

            }
        }
        
    });
};
export default images;