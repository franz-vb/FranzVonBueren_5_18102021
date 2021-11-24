let cart = JSON.parse(localStorage.getItem("panier"));

function deleteProduct() {

    const btnsDelete = document.querySelectorAll(".deleteItem");
    
    //console.log(btnsDelete);

    btnsDelete.forEach((btn) => {

        btn.addEventListener("click", (e) => {
            const cartItems = document.querySelectorAll(".cart__item");
            console.log(cartItems);
            let index = [...btnsDelete].indexOf(btn);
            console.log(index);
            cart.splice(index, 1);
            cartItems[index].remove();
            localStorage.setItem("panier", JSON.stringify(cart));
            deleteProduct(); // re initialise la lenght
        })

    })

};

function onChangeInputsQuantity() {
    const inputQuantity = document.querySelectorAll(".itemQuantity");
    //console.log(inputQuantity);
    const prices = document.querySelectorAll(".newPrice");
    //console.log(prices);
    inputQuantity.forEach((quantity) => {
        quantity.addEventListener("change", (e) => {
           let index = [...inputQuantity].indexOf(quantity);
           //console.log(inputQuantity);
           cart[index].quantity = parseInt(e.target.value);
           //console.log(e.target.value);
           let newPrice = cart[index].price * cart[index].quantity;
           localStorage.setItem("panier", JSON.stringify(cart));
           
           prices[index].innerText = `${newPrice} €`;
           //console.log(prices[index].innerText );
        })
    });
    //console.log(prices);
};

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
            })
            
             
        };

getProductFromCart();
onChangeInputsQuantity();
deleteProduct();






