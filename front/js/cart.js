// let cart = JSON.parse(localStorage.getItem("panier"));

// function sumQuantity() {
//     let totalQuantity = 0;
//     const inputQuantity = document.querySelectorAll(".itemQuantity");
//     const finalQuantity = document.querySelector("#totalQuantity");
//     inputQuantity.forEach((quantity) => {
//         totalQuantity += parseInt(quantity.value);
//     })
//     finalQuantity.innerText = totalQuantity;
// };

// function sumPrice() {
    
//     let totalPrice = 0;
//     const prices = document.querySelectorAll(".newPrice");
//     const finalPrice = document.querySelector("#totalPrice");
//     prices.forEach((price) => {
//         totalPrice += parseInt(price.innerText);
//     })
//     finalPrice.innerText = totalPrice;

// };

// function deleteProduct() {

//     const btnsDelete = document.querySelectorAll(".deleteItem");
//     btnsDelete.forEach((btn) => {

//         btn.addEventListener("click", (e) => {
//             const cartItems = document.querySelectorAll(".cart__item");
//             let index = [...btnsDelete].indexOf(btn);
//             cart.splice(index, 1);
//             cartItems[index].remove();
//             localStorage.setItem("panier", JSON.stringify(cart));
//             deleteProduct(); // re initialise la lenght
//         })

//     })

// };

// function onChangeInputsQuantity() {

//     totalQuantity = 0;
//     const inputQuantity = document.querySelectorAll(".itemQuantity"); //inputQuantity tableau d'une collection d'éléments
//     const prices = document.querySelectorAll(".newPrice");
//     inputQuantity.forEach((quantity) => {
//         quantity.addEventListener("change", (e) => {
//            let index = [...inputQuantity].indexOf(quantity);
//            cart[index].quantity = parseInt(e.target.value);
//            let newPrice = cart[index].price * cart[index].quantity;
//            localStorage.setItem("panier", JSON.stringify(cart));
           
//            prices[index].innerText = `${newPrice} €`;
//            sumQuantity();
//            sumPrice();
//         })
        
//     });
// };

// function getProductFromCart() {
    
//             cart.forEach((product) => {
//                 document.querySelector("#cart__items").innerHTML += `
//                     <article class="cart__item" data-id="${product.id}">
//                         <div class="cart__item__img">
//                         <img src="${product.img}" alt="Photographie d'un canapé">
//                         </div>
//                         <div class="cart__item__content">
//                         <div class="cart__item__content__titlePrice">
//                             <h2>${product.name}</h2>
//                             <p>${product.color}</p>
//                             <p class="newPrice">${product.price * product.quantity}€</p>
//                         </div>
//                         <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                               <p>Qté : </p>
//                               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"/>
//                             </div>
//                             <div class="cart__item__content__settings__delete">
//                               <p class="deleteItem">Supprimer</p>
//                             </div>
//                         </div>
//                         </div>
//                     </article>`;
//             })
            
             
//         };

// getProductFromCart();
// onChangeInputsQuantity();
// deleteProduct();
// sumQuantity();
// sumPrice();

let cart = JSON.parse(localStorage.getItem('panier'));

function sumQuantity() {
	let totalQuantity = 0;
	const inputQuantity = document.querySelectorAll('.itemQuantity');
	const finalQuantity = document.querySelector('#totalQuantity');
	inputQuantity.forEach((quantity) => {
		totalQuantity += parseInt(quantity.value);
	});
	finalQuantity.innerText = totalQuantity;
}

function sumPrice() {
	let totalPrice = 0;
	const prices = document.querySelectorAll('.newPrice');
	const finalPrice = document.querySelector('#totalPrice');
	prices.forEach((price) => {
		totalPrice += parseInt(price.innerText);
	});
	finalPrice.innerText = totalPrice;
}

function deleteItem(btn) {
	const btnsDelete = document.querySelectorAll('.deleteItem');
	let index = [...btnsDelete].indexOf(btn);
	cart.splice(index, 1);
	localStorage.setItem('panier', JSON.stringify(cart));
	getProductFromCart();
    sumQuantity();
    sumPrice();

}

function addListenerDelete() {
	const btnsDelete = document.querySelectorAll('.deleteItem');
	btnsDelete.forEach((btn) => {
		btn.addEventListener('click',()=> deleteItem(btn));
	});
}

function onChangeInputsQuantity() {
	totalQuantity = 0;
	const inputQuantity = document.querySelectorAll('.itemQuantity'); //inputQuantity tableau d'une collection d'éléments
	//console.log(inputQuantity);
	const prices = document.querySelectorAll('.newPrice');
	//console.log(prices);
	inputQuantity.forEach((quantity) => {
		quantity.addEventListener('change', (e) => {
			let index = [...inputQuantity].indexOf(quantity);
			cart[index].quantity = parseInt(e.target.value);
			let newPrice = cart[index].price * cart[index].quantity;
			localStorage.setItem('panier', JSON.stringify(cart));

			prices[index].innerText = `${newPrice} €`;
			sumQuantity();
			sumPrice();
		});
	});
}

function getProductFromCart() {
	document.querySelector('#cart__items').innerHTML = '';

	cart.forEach((product) => {
		//console.log(product)
		document.querySelector('#cart__items').innerHTML += `
                    <article class="cart__item" data-id="${product.id}">
                        <div class="cart__item__img">
                        <img src="${product.img}" alt="Photographie d'un canapé">
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p class="newPrice">${product.price * product.quantity}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"/>
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
	});

	addListenerDelete();
}

getProductFromCart();
onChangeInputsQuantity();
sumQuantity();
sumPrice();






