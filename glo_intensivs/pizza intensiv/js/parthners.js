//const array = [11, 34, 57, 798, 45];
// for (let i = 0; i < array.length; i++) {

//     console.log(array[i]);
// }
// array.forEach(function (elem, index, array) {

//     console.log(elem);
//     console.log(index);
//     console.log(array);
// })
// array.forEach((elem) => {
//     console.log(elem);
// })
// array.forEach((elem, index) => {
//     if (index === 3) {
//         console.log(elem);
//         console.log(index);
//     }
// })
// const renderItems = (data) => {
//     console.log(data);
// }
//fetch // получать или отправлять информацию
// fetch("./db/partners.json")
//     .then((responce) => responce.json())
//     .then((data) => {
//         //console.log(data);
//         renderItems(data);
//     })
//     .then(console.log('2'))
//     .then(console.log('3'))
//     .then(console.log('4'))
//     .then(console.log('5'))

// fetch("./db/sdfsfsdf.json")
//     .then((responce) => responce.json())
//     .then((data) => {
//         //console.log(data);
//         renderItems(data);
//     })
//     .catch((error) => {
//         console.log(error)
//     })
//.finally
const parthners = () => {
    //контейнер с карточками ресторанов. Будем заполнять его с помощью java script
    const cardsRestaurants = document.querySelector('.cards-restaurants')
    //console.log(cardsRestaurants);
    // cardsRestaurants.classList.add('111')// добавить класс в элемент
    ///cardsRestaurants.classList.remove('111')//удалить класс из элемента
    //cardsRestaurants.classList.toggle('111')//если класса в элементе нет - добавляет, но если есть - удаляет
    //console.dir(cardsRestaurants);

    const renderItems = (data) => {
        //console.log(data);
        //data.forEach(({ image, kitchen, name, price, time_of_delivery, stars, products }) => { //можно так
        data.forEach(item => {
            // console.log(item)
            // console.log(item.name)
            //деструкторизация item. Достаем из объекта информацию и можем обращаться к ней непостредственно
            const { image, kitchen, name, price, time_of_delivery, stars, products } = item
            //console.log(products);
            //создание тега a
            const a = document.createElement('a') //создает и держит в памяти, не добавляет на страницу
            a.setAttribute('href', './restaurant.html');//добавление тегу аттрибута
            //console.log(a.getAttribute('href'));
            a.classList.add('card')
            a.classList.add('card-restaurant')
            // a.innerHTML = "<span>Content of teg</span>"
            //интерполяция - текст в таких кавычках читается и выоплняется как java script
            // a.innerHTML = `
            // <span>${item.name}</span>
            // `
            //добавление свойства тегу a (добавим свойство products)
            //a.products = products
            // или воспользоваться data атрибутами
            a.dataset.products = products
            //console.dir(a);
            a.innerHTML = `   
            <img src="${image}" alt="${name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${time_of_delivery}</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${stars}
					</div>
					<div class="price">От ${price}грн</div>
					<div class="category">${kitchen}</div>
				</div>
			</div>
		`
            //перехват клика по карточке
            a.addEventListener('click', (e) => {
                //остановим стандартное поведение ссылки - переход по адресу
                e.preventDefault()
                //cохраним link на страницу в local storage
                // const link = a.dataset.products
                // localStorage.setItem('restaurant', link)
                //cохраним не линк, а объект в виде строки, чтобы иметь к нему доступ в menu.js
                localStorage.setItem('restaurant', JSON.stringify(item))
                // перейдем на другую страницу
                window.location.href = './restaurant.html'

            })
            cardsRestaurants.append(a)
            //console.log(a);
        })
    }
    fetch("https://test-c02b9-default-rtdb.firebaseio.com/db/partners.json")
        .then((responce) => responce.json())
        .then((data) => {
            //console.log(data);
            renderItems(data);
        })
        .catch((error) => {
            console.log(error);
        })
}
parthners()