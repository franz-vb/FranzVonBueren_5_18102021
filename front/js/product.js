const urlParams = new URLSearchParams(window.location.search); 
const idProduct = urlParams.get("id");

let myProduct; 
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productImg = document.querySelector(".item__img");
let productColorsOptions = document.querySelector('#colors');

function getProductFromId() {
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(data => { 

        myProduct = data.filter(product => idProduct == product._id);

        productTitle.textContent = `${myProduct[0].name}`;
        productDescription.textContent = `${myProduct[0].description}`
        productPrice.textContent = `${myProduct[0].price}`;
        productImg.innerHTML += `<img src=${myProduct[0].imageUrl} alt=Photographie d'un canapé />`;

        for (let i = 0; i < myProduct[0].colors.length; i++) {

            productColorsOptions.innerHTML += `<option value=${myProduct[0].colors[i]}>${myProduct[0].colors[i]}</option>`;
        }

    });

    localStorage.setItem("#quantity",ol.innerHTML);
};


getProductFromId();