let cart;
 
function addCartFromProduct() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        data.map((product) => {

          if (localStorage.getItem(`${product._id}`)) {

            cart = JSON.parse(localStorage.getItem(`${product._id}`));

            document.querySelector("#cart__items").innerHTML += `
            <article class="cart__item" data-id="${product._id}">
            <div class="cart__item__img">
              <img src=${product.imageUrl} alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                <h2>${product.name}</h2>
                <p>${product.price * cart[1]} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${cart[1]}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[1]}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
          }

        });
      });
  }

  addCartFromProduct();
