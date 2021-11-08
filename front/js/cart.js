let cart;

function handleOnChange() {
  const inputQty = document.getElementsByClassName("itemQuantity");
  const qtyInput = document.getElementsByClassName("qty");
  const priceProduct = document.getElementsByClassName("priceProduct");
  const nameProduct = document.getElementsByClassName("nameProduct");

  for (let i = 0; i < inputQty.length; i++) {

    inputQty[i].addEventListener('change', (e) => {

      if (!localStorage.getItem(`${nameProduct[i].textContent}`)) {
        localStorage.setItem(`${nameProduct[i].textContent}`, JSON.stringify(parseInt(priceProduct[i].textContent)));
      }

      qtyInput[i].textContent = `Qté : ${e.target.value}`;
      priceProduct[i].textContent =  localStorage.getItem(`${nameProduct[i].textContent}`) * e.target.value;
      
    })
  }
}

function displayProductWithSameId(index1, index2, product) {

  document.querySelector("#cart__items").innerHTML += `
  <article class="cart__item" data-id="${product._id}">
    <div class="cart__item__img">
      <img src=${product.imageUrl} alt=${product.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2 class="nameProduct">${product.name}</h2>
        <p>${cart[index1]}</p>
        <p class="priceProduct">${product.price * cart[index2]} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p class="qty">Qté : ${cart[index2]}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[index2]}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

}
 
function addCartFromProduct() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        data.map((product) => {

          if (localStorage.getItem(`${product._id}`)) {

            cart = JSON.parse(localStorage.getItem(`${product._id}`));

            let nbrElements = cart.length / 2;
            let length = 0;

            for (let i = 0; i < nbrElements; i++) {
              
              displayProductWithSameId(length, length + 1, product);
              length += 2;
            }

          }
          
        })
      })
      
      setTimeout(function() {
         handleOnChange(); 
        }, 1000);

  }
    
  addCartFromProduct();