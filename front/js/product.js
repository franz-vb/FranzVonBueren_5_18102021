const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get("id");
const btnCart = document.querySelector("#addToCart");
const itemQty = document.querySelector("#quantity");

let productName = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productImg = document.querySelector(".item__img");
let productColorsOptions = document.querySelector("#colors");
let quantity = document.querySelector("#quantity");
let cart;
let isPresent;

/* Fonction qui récupère les données du produit clické */
function getProductFromId() {
  /* On fetch sur l'API et on récupère les datas du produit clické*/
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then((product) => {

      /* Afficher les données du produit sur la page */ 
      productName.textContent = `${product.name}`;
      productDescription.textContent = `${product.description}`;
      productPrice.textContent = `${product.price}`;
      productImg.innerHTML += `<img id=productImg src=${product.imageUrl} alt=Photographie d'un canapé />`;

      product.colors.forEach((color) => {
        productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
      });
    });
}

getProductFromId();

/* Ecouteur d'événement sur le bouton "Ajouter au panier" */
btnCart.addEventListener("click", (e) => {
  isPresent = false;

  /* Si la clé "panier" existe dans le localStorage alors éxécute le code suivant : */
  if (localStorage.getItem("panier")) {
    cart = JSON.parse(localStorage.getItem("panier"));
    cart.forEach((product) => {
      /* Si l'ID et la couleur sont déjà présent dans le panier, on va donc additionner la quantité et non pas créer une nouvelle ligne produit */
      if (product.id + product.color == idProduct + productColorsOptions.value) {
        product.quantity += parseInt(quantity.value);
        localStorage.setItem("panier", JSON.stringify(cart));
        alert("Produit ajouté au panier");
        isPresent = true;
      }
    });

    /* Si le produit n'était pas présent dans le panier, on crée une nouvelle ligne produit */
  } else {
    if (quantity.value != 0 && productColorsOptions.value != "") {
      console.log("test 1");
      cart = [];
      cart.push({
        id: idProduct,
        quantity: parseInt(quantity.value),
        color: productColorsOptions.value,
        name: productName.textContent,
        price: productPrice.textContent,
        img: document.querySelector("#productImg").src,
      });
      localStorage.setItem("panier", JSON.stringify(cart));  
      console.log(("panier", JSON.stringify(cart)));
      alert("Produit ajouté au panier");
      isPresent = true;
    }
  }
  /* Si le produit n'est pas présent dans le localStorage alors : */
  if (!isPresent && quantity.value != 0 && productColorsOptions.value != "") {
    cart.push({
      id: idProduct,
      quantity: parseInt(quantity.value),
      color: productColorsOptions.value,
      name: productName.textContent,
      price: productPrice.textContent,
      img: document.querySelector("#productImg").src,
    });
    localStorage.setItem("panier", JSON.stringify(cart)); 
    alert("Produit ajouté au panier");
  }
});
