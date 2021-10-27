//retourne un objet USP permettant d'accéder aux arguments de la requete GET contenu dans l'URL.
const urlParams = new URLSearchParams(window.location.search); 
const idProduct = urlParams.get("id");

let myProduct; 
// document.querySelector permet de récuperer une classe(.) ou un ID(#) ou une balise('').
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productImg = document.querySelector(".item__img");
let productColorsOptions = document.querySelector('#colors');

//Fonction qui me permet de récuperer ID de mes produits.
function getProductFromId() {
    //fetch a besoin d'un URL
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())//json permet a notre naviagateur d'interpreter.mais envoi juste une réponse en attente
    .then(data => { //2ème .then pour pouvoir lire notre réponse.

        //console.log(data)

        //filtre mon tab,si ID du produit(1er page) est égale à l'ID du tab alors..
        myProduct = data.filter(product => idProduct == product._id);

        productTitle.textContent = `${myProduct[0].name}`;//textContent de l'objet productTitle égale mon tab a l'objet name
        productDescription.textContent = `${myProduct[0].description}`
        productPrice.textContent = `${myProduct[0].price}`;
        productImg.innerHTML += `<img src=${myProduct[0].imageUrl} alt=Photographie d'un canapé />`;

        for (let i = 0; i < myProduct[0].colors.length; i++) {

            productColorsOptions.innerHTML += `<option value=${myProduct[0].colors[i]}>${myProduct[0].colors[i]}</option>`;
        }

    });
};

getProductFromId();