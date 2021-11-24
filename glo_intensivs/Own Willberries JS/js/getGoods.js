const getGoods = () => {

    const links = document.querySelectorAll(".navigation-link");
    const linkViewAll = document.querySelector(".more");
   
    //console.log(links);
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
    const getData = (value, category) => {
        fetch("./db/db.json")
        .then((response) => 
            //json - получаем объект. response.text() - получим не объект, а текст
             response.json())
        .then((data) => {
            //console.log(data);
            const array = category?data.filter((item)=>item[category] === value) : data; //return item.gender === "Mens";
           
          localStorage.setItem("goods", JSON.stringify(array));
          if(window.location.pathname.toLocaleLowerCase().includes('goods.html'))
          {
            renderGoods(array);
          }
          else
          {
            window.location.href = './goods.html';
          }
        });
    };

    links.forEach((link) => {
        //console.log(link);
        link.addEventListener('click', (event)=>{
            event.preventDefault();
           // console.log(link);
           const linkValue = link.textContent;
           const category = link.dataset.field;
          // console.log(category);
            getData(linkValue, category);
        });
       
    });

   

    if(localStorage.getItem('goods') && (window.location.pathname.toLocaleLowerCase().includes('goods.htm'))){
        renderGoods(JSON.parse(localStorage.getItem('goods')));
    }
  //  localStorage.setItem("goods", JSON.stringify([1,2,3,4,5]));//stringify({name: "all"}))
  //  const arr = (JSON.parse(localStorage.getItem("goods")));
  //  console.log(arr);
   // localStorage.removeItem("goods");

   if(linkViewAll)
   {
        linkViewAll.addEventListener('click', (event)=>{
        event.preventDefault();
        getData();
      });
  }
};
getGoods();