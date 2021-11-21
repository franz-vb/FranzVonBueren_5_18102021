let cart = JSON.parse(localStorage.getItem("panier"));
let inputQuantity;
// let newPrice = cart[index].price * cart[index].quantity;
// let newPrice = document.querySelector("#totalPrice");
// console.log(totalPrice);

function onChangeInputsQuantity() {
    inputQuantity = document.querySelectorAll(".itemQuantity");
    inputQuantity.forEach((quantity) => {
        quantity.addEventListener("change", (e) => {
           let index = [...inputQuantity].indexOf(quantity);
           //console.log([...inputQuantity].indexOf(quantity));
           cart[index].quantity = parseInt(e.target.value); 
           //console.log(cart[index].quantity );
           //console.log(e.target.value);
           let newPrice = cart[index].price * cart[index].quantity;
           localStorage.setItem("panier", JSON.stringify(cart));
           //console.log(newPrice);
           
           document.querySelector("#newPrice").textContent = `${newPrice}`;
           //return newPrice;
        })
    });
};

// function updatePrice(price) {
    
//     //localStorage.getItem("panier", JSON.stringify(cart));
//     console.log(cart);
//     cart.forEach((product) => {
        
//     });

// };


function getProductFromCart() {
    
            cart.forEach((product) => {
                //console.log(product)
                document.querySelector("#cart__items").innerHTML += `
                    <article class="cart__item" data-id="${product.id}">
                        <div class="cart__item__img">
                        <img src="${product.img}" alt="Photographie d'un canapé">
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p id="newPrice">${product.price * product.quantity}€</p>
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
                    //document.querySelector("#totalPrice").textContent = `${product.price}`;
            })
            
             
        };

getProductFromCart();
onChangeInputsQuantity();
//updatePrice();






