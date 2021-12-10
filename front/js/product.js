// URLSearchParams méthode pour récuperer l'ID dans l'URL
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

//Ouvrir une page produit avec le produit ciblé
function getProductFromId() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then((product) => {
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

// Bouton ajouter a panier
btnCart.addEventListener("click", (e) => {
  isPresent = false;

  if (localStorage.getItem("panier")) {
    // Il y a déja un produit dans le panier
    cart = JSON.parse(localStorage.getItem("panier"));
    cart.forEach((product) => {
      if (product.id + product.color == idProduct + productColorsOptions.value) {
        product.quantity += parseInt(quantity.value);
        localStorage.setItem("panier", JSON.stringify(cart));
        alert("Produit ajouté au panier");
        isPresent = true;
      }
    });
    // Premier produit au panier
  } else {
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
    alert("Produit ajouté au panier");
    isPresent = true;
  }
  //Il y a déja des produits dans le panier, mais on veut ajouter de nouveaux
  if (!isPresent) {
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
