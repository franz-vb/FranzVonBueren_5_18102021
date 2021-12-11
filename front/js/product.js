// // URLSearchParams méthode pour récuperer l'ID dans l'URL
// const urlParams = new URLSearchParams(window.location.search);
// const idProduct = urlParams.get("id");

// const btnCart = document.querySelector("#addToCart");
// const itemQty = document.querySelector("#quantity");

// let productName = document.querySelector("#title");
// let productDescription = document.querySelector("#description");
// let productPrice = document.querySelector("#price");
// let productImg = document.querySelector(".item__img");
// let productColorsOptions = document.querySelector("#colors");
// let quantity = document.querySelector("#quantity");

// let cart;
// let isPresent;

// //Ouvrir une page produit avec le produit ciblé
// function getProductFromId() {
//   fetch("http://localhost:3000/api/products/" + idProduct)
//     .then((response) => response.json())
//     .then((product) => {
//       productName.textContent = `${product.name}`;
//       productDescription.textContent = `${product.description}`;
//       productPrice.textContent = `${product.price}`;
//       productImg.innerHTML += `<img id=productImg src=${product.imageUrl} alt=Photographie d'un canapé />`;

//       product.colors.forEach((color) => {
//         productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
//       });
//     });
// }

// getProductFromId();

// // Bouton ajouter a panier
// btnCart.addEventListener("click", (e) => {
//   isPresent = false;

//   if (localStorage.getItem("panier")) {
//     // Il y a déja un produit dans le panier
//     cart = JSON.parse(localStorage.getItem("panier"));
//     cart.forEach((product) => {
//       if (product.id + product.color == idProduct + productColorsOptions.value) {
//         product.quantity += parseInt(quantity.value);
//         localStorage.setItem("panier", JSON.stringify(cart));
//         alert("Produit ajouté au panier");
//         isPresent = true;
//       }
//     });
//     // Premier produit au panier
//   } else {
//     cart = [];
//     cart.push({
//       id: idProduct,
//       quantity: parseInt(quantity.value),
//       color: productColorsOptions.value,
//       name: productName.textContent,
//       price: productPrice.textContent,
//       img: document.querySelector("#productImg").src,
//     });
//     localStorage.setItem("panier", JSON.stringify(cart));
//     alert("Produit ajouté au panier");
//     isPresent = true;
//   }
//   //Il y a déja des produits dans le panier, mais on veut ajouter de nouveaux
//   if (!isPresent) {
//     cart.push({
//       id: idProduct,
//       quantity: parseInt(quantity.value),
//       color: productColorsOptions.value,
//       name: productName.textContent,
//       price: productPrice.textContent,
//       img: document.querySelector("#productImg").src,
//     });
//     localStorage.setItem("panier", JSON.stringify(cart));
//     alert("Produit ajouté au panier");
//   }
// });

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
let isPresent;

/* Fonction qui récupère les données du produit clické */

function getProductFromId() {
    /* On fetch sur l'API et on récupère les datas du produit clické*/ 
    fetch("http://localhost:3000/api/products/" + idProduct )
    .then(response => response.json())
    .then(product => { 

        /* On utilise les données fetchés afin de remplir (textContent) les éléments HTML et donc d'afficher les données du produit sur la page */ 
        productName.textContent = `${product.name}`;
        productDescription.textContent = `${product.description}`
        productPrice.textContent = `${product.price}`;
        productImg.innerHTML += `<img id=productImg src=${product.imageUrl} alt=Photographie d'un canapé />`;

        /* On boucle sur le tableau colors afin d'afficher toutes les options couleur */ 
        product.colors.forEach((color) => {
            productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
        })
    });
};

getProductFromId();
                
/* Ecouteur d'événement sur le bouton "ajout au panier" */ 
btnCart.addEventListener("click", (e) => {

    /* Booléen qui permet de savoir si la couleur est déjà présente dans le localStorage quand on ajoute un produit */ 
    isPresent = false;

    /* Si la clé "panier" existe dans le localStorage alors éxécute le code suivant : */
    if (localStorage.getItem("panier")) {
    /* On récupère le contenu (tableau d'objet) du localStorage et on le met dans la variable cart qui est un tableau */
        cart = JSON.parse(localStorage.getItem("panier"));
        /* On boucle sur le tableau cart afin de vérifier si la couleur est déjà présente dans le panier */
        cart.forEach((product) => { 
            /* Si l'ID et la couleur sont déjà présent dans le panier, on va donc additionner la quantité et non pas créer une nouvelle ligne produit */
            if (product.id + product.color == idProduct + productColorsOptions.value) {

                /* Ici on additionne la quantité présente dans cart (product.quantité) avec la quantité sélectionnée dans l'input (quantity.value) */ 
                product.quantity += parseInt(quantity.value);
                /* On met à jour le localStorage avec les nouvelles données et pour cela on push cart */ 
                localStorage.setItem("panier", JSON.stringify(cart));
                alert("Produit ajouté au panier");
                /* Le produit était présent donc on met isPresent à true */ 
                isPresent = true;
            }
        });

    /* Si le produit n'était pas présent dans le panier, on crée une nouvelle ligne produit */
    } else {
        /* On initialise cart comme un tableau vide*/ 
        cart = [];
        /* On push dan cart un objet qui contient les valeurs du produit qu'on veut ajouter au panier*/
        cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
        /* On met à jour le localStorage */ 
        localStorage.setItem("panier", JSON.stringify(cart));
        alert("Produit ajouté au panier");
        /* Maintenant qu'on a ajouté le produit alors il est présent donc on met le booléen à true */ 
        isPresent = true;
    }
    /* Si le produit n'est pas présent dans le localStorage alors : */ 
    if (!isPresent) {
        /* On push dan cart un objet qui contient les valeurs du produit qu'on veut ajouter au panier*/
        cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
        /* On met à jour le localStorage */ 
        localStorage.setItem("panier", JSON.stringify(cart));
        alert("Produit ajouté au panier");
    } 
});
