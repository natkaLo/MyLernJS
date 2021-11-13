const cart = () => {
    const CartButton = document.getElementById('cart-button')
    const modalCart = document.querySelector('.modal-cart')
    // const close = document.querySelector('.close') //не через документ, а через родителя
    const close = modalCart.querySelector('.close')
    const modalBody = modalCart.querySelector('.modal-body')
    const buttonPrimary = modalCart.querySelector('.button-primary')

    const resetCart = () => {
        modalBody.innerHTML = '' // очищаем прошлые данные
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')// закрываем модальное окно

    }
    const incrementCount = (id) => {
        if (localStorage.getItem('cart')) {
            const cartArray = JSON.parse(localStorage.getItem('cart'))
            cartArray.map((item) => {
                if (item.id === id)
                    item.count++
                return item
            })
            localStorage.setItem('cart', JSON.stringify(cartArray))
            renderItems(cartArray)
        }
        // console.log("inc" + id)
    }

    const dectrementCount = (id) => {
        // console.log("dec" + id)
        if (localStorage.getItem('cart')) {
            const cartArray = JSON.parse(localStorage.getItem('cart'))
            cartArray.map((item) => {
                if (item.id === id && item.count > 0)
                    item.count--
                return item
            })
            localStorage.setItem('cart', JSON.stringify(cartArray))
            renderItems(cartArray)
        }
    }

    const renderItems = (data) => {
        modalBody.innerHTML = '' // очищаем прошлые данные

        data.forEach(({ name, price, id, count }) => {
            // console.log(cartItem)

            const FoodRow = document.createElement('div')
            FoodRow.classList.add('food-row')
            FoodRow.innerHTML = `
            <span class="food-name">${name}</span>
			<strong class="food-price">${price} ₽</strong>
			<div class="food-counter">
				<button class="counter-button btn-dec" data-index = "${id}">-</button>
				    <span class="counter">${count}</span>
				<button class="counter-button btn-inc" data-index = "${id}">+</button>
			</div>
         `
            // FoodRow.querySelector('.btn-dec').addEventListener('click', () => {
            //     dectrementCount(id)

            // })
            // FoodRow.querySelector('.btn-inc').addEventListener('click', () => {
            //     incrementCount(id)

            //  })
            modalBody.append(FoodRow)// добавляем данные

        })
    }
    modalBody.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('btn-inc')) {
            //console.log(e.target.dataset.index)
            incrementCount(e.target.dataset.index)
        }
        else if (e.target.classList.contains('btn-dec')) {
            //console.log(e.target.dataset.index)
            dectrementCount(e.target.dataset.index)
        }
    })

    buttonPrimary.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            const cartArray = JSON.parse(localStorage.getItem('cart'))
            //отравим данные на сервер
            //второй параметр - настройки fetch
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',// по умолчанию GET
                body: cartArray// отправляем в Json формате

            })
                .then(response => {
                    if (response.ok) {
                        console.log('ok')
                        resetCart()
                    }
                })
                .catch(e => {
                    console.error(e)
                })
        }
    })

    CartButton.addEventListener('click', () => {

        //console.log(modalCart)
        if (localStorage.getItem('cart'))
            renderItems(JSON.parse(localStorage.getItem('cart')))

        modalCart.classList.add('is-open')

    })
    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}
cart()