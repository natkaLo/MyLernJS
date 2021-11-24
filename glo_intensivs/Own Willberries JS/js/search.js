const search = function(){
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');
    //console.log(input);
    //console.log(searchBtn);


    const renderGoods = (goods) => {
        //console.log(goods);
        const goodsContainer = document.querySelector(".long-goods-list");
        goodsContainer.innerHTML = '';
        goods.forEach(({ category, description, gender, id, img, label, name, offer, price}) => {
           const goodBlock = document.createElement('div');
           goodBlock.classList.add('col-lg-3');
           goodBlock.classList.add('col-sm-6');
          
           goodBlock.innerHTML= `
                <div class="goods-card">
				    <span class="label ${label? null: 'd-none'}">${label}</span>
					<img src="db/${img}" alt=${name} class="goods-image">
					<h3 class="goods-title">${name}</h3>
					<p class="goods-description">${description}</p>
					<button class="button goods-card-btn add-to-cart" data-id=${id}>
						<span class="button-price">$${price}</span>
					</button>
				</div>
           `;

          // console.log(goodBlock);
          // console.log(good);

           goodsContainer.append(goodBlock);
          
        });
   };
    const getData = (value) => {
        fetch("./db/db.json")
        .then((response) => 
            //json - получаем объект. response.text() - получим не объект, а текст
             response.json())
        .then((data) => {
            //console.log(data);
            const array = data.filter(good =>{
                return good.name.toLowerCase().includes(value.toLowerCase());
                
            });
          // console.log(value);
          localStorage.setItem("goods", JSON.stringify(array));

          if(window.location.pathname.toLocaleLowerCase().includes('goods.htm'))
          {
            renderGoods(array);
          }
          else
          {
            window.location.href = './goods.html';
           
          }
        });
    };


    // input.addEventListener('input',(event)=>{
    //    // console.log("ввод символа");
    //    console.log(event.target.value);
    // });
    try{
        searchBtn.addEventListener('click', ()=>{
            //console.log(input.value);
            getData(input.value);
        });
    }
    catch(e)
    {
        console.error(e.message);
    }
};

search();