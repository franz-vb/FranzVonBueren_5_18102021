const urlParams = new URLSearchParams(window.location.search); 
const idProduct = urlParams.get("id");
const btnCart = document.querySelector("#addToCart");
const itemQty = document.querySelector('#quantity');

let myProduct; 
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productImg = document.querySelector(".item__img");
let productColorsOptions = document.querySelector('#colors');

function getProductFromId() {
    fetch("http://localhost:3000/api/products/"+ idProduct)
    .then(response => response.json())
    .then(product => { 

        productTitle.textContent = `${product.name}`;
        productDescription.textContent = `${product.description}`
        productPrice.textContent = `${product.price}`;
        productImg.innerHTML += `<img src=${product.imageUrl} alt="${product.altTxt}"/>`;

            
        //for (let i = 0; i < product.colors.length; i++) {
            product.colors.map((color) => {  
            productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
            })

    });

};

btnCart.addEventListener("click", () => {

    let cart;

    if (localStorage.getItem(`${idProduct}`)) {

        cart = JSON.parse(localStorage.getItem(`${idProduct}`));
        cart[1] = parseInt(cart[1]);

        if (cart[0] == productColorsOptions.value) {

            cart[1] += parseInt(itemQty.value);
            localStorage.setItem(`${idProduct}`, JSON.stringify(cart));
        }
        
    }

    else {
        localStorage.setItem(`${idProduct}`, JSON.stringify([productColorsOptions.value, itemQty.value]));
        alert("Produit ajouté au panier");
    }

})

getProductFromId();