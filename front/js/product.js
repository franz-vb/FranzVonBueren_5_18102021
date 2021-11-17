/* const urlParams = new URLSearchParams(window.location.search); 
const idProduct = urlParams.get("id");

let btnCart = document.querySelector("#addToCart");
let quantity = document.querySelector("#quantity");


function getProductFromApi() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((response) => response.json())
        .then(product => {
                document.querySelector(".item").innerHTML = `
                <article>
                <div class="item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="item__content">
    
                  <div class="item__content__titlePrice">
                    <h1 id="title">${product.name}</h1>
                    <p>Prix : <span id="price">${product.price}</span>€</p>
                  </div>
    
                  <div class="item__content__description">
                    <p class="item__content__description__title">Description :</p>
                    <p id="description">${product.description}</p>
                  </div>
    
                  <div class="item__content__settings">
                    <div class="item__content__settings__color">
                      <label for="color-select">Choisir une couleur :</label>
                      <select name="color-select" id="colors">
                          <option value="">--SVP, choisissez une couleur --</option>
<!--                       <option value="vert">vert</option>
                          <option value="blanc">blanc</option> -->
                      </select>
                    </div>
    
                    <div class="item__content__settings__quantity">
                      <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                      <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                    </div>
                  </div>
    
                  <div class="item__content__addButton">
                    <button id="addToCart">Ajouter au panier</button>
                  </div>
    
                </div>
              </article>`;
              product.colors.forEach((colors) => {
                document.querySelector("#colors").innerHTML +=
                `<option value="${colors}">${colors}</option>`; 
              })
            })
        }; */

        const urlParams = new URLSearchParams(window.location.search); 
        const idProduct = urlParams.get("id");
        const btnCart = document.querySelector("#addToCart");
        const itemQty = document.querySelector('#quantity');
                        
        let productName = document.querySelector("#title");
        let productDescription = document.querySelector("#description");
        let productPrice = document.querySelector("#price");
        let productImg = document.querySelector(".item__img");
        let productColorsOptions = document.querySelector('#colors');
        let quantity = document.querySelector("#quantity");
        let cart ;
        let isPresent = true;
        
        function getProductFromId() {
          fetch("http://localhost:3000/api/products/" + idProduct )
          .then(response => response.json())
          .then(product => { 
        
              productName.textContent = `${product.name}`;
              productDescription.textContent = `${product.description}`
              productPrice.textContent = `${product.price}`;
              productImg.innerHTML += `<img id=productImg src=${product.imageUrl} alt=Photographie d'un canapé />`;
        
              product.colors.forEach((color) => {
                  productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
              })
          });
        };
        
        getProductFromId();
                       
        btnCart.addEventListener("click", (e) => {
          
          if (localStorage.getItem("panier")) {
            cart = JSON.parse(localStorage.getItem("panier"));
            console.log(cart);
            cart.forEach((product) => {
              //produits dans le panier
              //console.log(product.name + product.color);
              //nouveau produit sélectionné
              //console.log(productName.textContent + productColorsOptions.value);
              if (product.id + product.color == idProduct + productColorsOptions.value) {
                //console.log("egal");
                product.quantity += parseInt(quantity.value);
                localStorage.setItem("panier", JSON.stringify(cart));
                isPresent = true;
              }
              else {
                isPresent = false;
              }
            });
          } else {
            cart = [];
            cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
            localStorage.setItem("panier", JSON.stringify(cart));
          }
           if (!isPresent) {
            cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
            localStorage.setItem("panier", JSON.stringify(cart));
           } 
        });
        
        
        
        
        
        
            
        