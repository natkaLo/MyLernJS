const menu = () => {
    //const restourant = 'tanuki'
    const cardsMenu = document.querySelector('.cards-menu')
    //массив для заказов в корзину получим из локал сторач, если он там есть в виде объекта - если нет - пустой массив
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    //console.log(cardsMenu);
    //смена заголовка на странице
    //добавление в корзину - добавление в local storage Потом будем показывать в cart.js
    const AddToCard = (cardItem) => {
        //console.log(cardItem)
        //добавим в массив элемент, если его там нет . Если есть - увеличим кол-во
        //some - перебирает елементы
        if (cartArray.some((item) => item.id === cardItem.id)) {
            //console.log("1")
            //опять перебираем массив с помощью map и изменяем count
            cartArray.map((item => {
                if (item.id === cardItem.id)
                    item.count++
                return item
            }))
        }
        else {
            cartArray.push(cardItem)
        }
        //запишем массив в local storage в виде строки
        localStorage.setItem('cart', JSON.stringify(cartArray))
    }

    const changeTitle = (restaurant) => {
        //   console.log(restaurant)
        const restaurantTitle = document.querySelector('.restaurant-title')
        restaurantTitle.textContent = restaurant.name
        const rating = document.querySelector('.rating')
        rating.textContent = restaurant.stars
        const price = document.querySelector('.price')
        price.textContent = "От " + restaurant.price + " uan"
        const category = document.querySelector('.category')
        category.textContent = restaurant.kitchen

    }
    const renderItems = (data) => {
        //console.log(data);
        data.forEach(({ id, name, description, price, image }) => {
            const Div = document.createElement('div')
            Div.classList.add('card')
            Div.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
		<div class="card-text">
			<div class="card-heading">
			    <h3 class="card-title card-title-reg">${name}</h3>
			</div>
			<!-- /.card-heading -->
			<div class="card-info">
				<div class="ingredients">${description}</div>
			</div>
			<!-- /.card-info -->
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
			    <strong class="card-price-bold">${price} ₽</strong>
			</div>
		</div>
        `
            const cardButtons = Div.querySelector('.button-card-text').addEventListener('click', () => {
                //  console.log(cardButtons)
                // console.log(name)
                //создадим объект, который запомним в local storage чтобы потом отобразить в корзине
                // const cartItem = {
                //     name: name,
                //     price: price,
                //     count: 1
                // }
                //AddToCard(cartItem)
                // можно так записать - (если поле = значению (name:name), то можно писать просто name)
                AddToCard({ name, price, id, count: 1 })
            })

            cardsMenu.append(Div)
            // console.log(Div)
        })
    }

    //получим данные из local storage, которые мы туда сохранили кликнув по карточке ресторана в index .html
    //console.log(localStorage.getItem('restaurant'))
    if (localStorage.getItem('restaurant')) // если данные с таким ключем есть в local storage
    {
        //тогда получаем данные из базы данных с линком из local storage
        // const restaurant =localStorage.getItem('restaurant') // получили объект в виде строки
        const restaurant = JSON.parse(localStorage.getItem('restaurant')) // преобразование строки в объект
        //достанем из объекта свойство products
        //fetch // получать или отправлять информацию
        fetch(`./db/${restaurant.products}`)
            .then((responce) => responce.json())
            .then((data) => {
                //console.log(data);
                renderItems(data);
                changeTitle(restaurant)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    else {
        window.location.href('/')//если данных в local storage нет - отправим на главную стрницу
    }
}
menu()




