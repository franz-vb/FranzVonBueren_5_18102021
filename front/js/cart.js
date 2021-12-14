let cart = JSON.parse(localStorage.getItem("panier"));
const formContact = document.querySelector(".cart__order__form");

/* Fonction qui vérifie que les inputs saisis ne contiennent pas d'erreur */
function checkErrors(firstNameContact, lastNameContact, addressContact, cityContact, emailContact) {
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");

  let isError = false;

  /* REGEX pour les inputs */ 
  const regexText = /[a-zA-Z\s\-À-ÖØ-öø-ÿ]+$/;
  const regexEmail = /([a-z0-9.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const regexAddress = /^[a-zA-Z0-9,\s\-À-ÖØ-öø-ÿ]+$/;

/* Si le text return false (donc ne passe pas) */ 
  if (!regexText.test(firstNameContact)) {
    firstNameErrorMsg.textContent = "Le prénom n'est pas valide"; 
    isError = true;
  } else {
    firstNameErrorMsg.textContent = "";
  }
  if (!regexText.test(lastNameContact)) {
    lastNameErrorMsg.textContent = "Le nom n'est pas valide";
    isError = true;
  } else {
    lastNameErrorMsg.textContent = "";
  }
  if (!regexAddress.test(addressContact)) {
    addressErrorMsg.textContent = "L'adresse n'est pas valide";
    isError = true;
  } else {
    addressErrorMsg.textContent = "";
  }
  if (!regexText.test(cityContact)) {
    cityErrorMsg.textContent = "La ville n'est pas valide";
    isError = true;
  } else {
    cityErrorMsg.textContent = "";
  }
  if (!regexEmail.test(emailContact)) {
    emailErrorMsg.textContent = "L'email n'est pas valide";
    isError = true;
  } else {
    emailErrorMsg.textContent = "";
  }

  return isError;
}

// Calcule de la quantité total
function sumQuantity() {
  let totalQuantity = 0;
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  const finalQuantity = document.querySelector("#totalQuantity");

  inputQuantity.forEach((quantity) => {
    totalQuantity += parseInt(quantity.value);
  });
  finalQuantity.innerText = totalQuantity;
}

// Calcule du prix total
function sumPrice() {
  let totalPrice = 0;
  const prices = document.querySelectorAll(".newPrice");
  const finalPrice = document.querySelector("#totalPrice"); 
  prices.forEach((price) => {
    totalPrice += parseInt(price.innerText);
  });
  finalPrice.innerText = totalPrice;
}

// Fonction de suppression 
function deleteItem(btn) {
  const btnsDelete = document.querySelectorAll(".deleteItem"); 
  let index = [...btnsDelete].indexOf(btn); 
  cart.splice(index, 1); 
  localStorage.setItem("panier", JSON.stringify(cart));
  getProductFromCart();
  sumQuantity();
  sumPrice();
}

/* Ici on a une fonction qui va mettre en place un écouteur d'événements */ 
function addListenerDelete() {
  const btnsDelete = document.querySelectorAll(".deleteItem");
  btnsDelete.forEach((btn) => { 
    btn.addEventListener("click", () => deleteItem(btn));
  });
}

/* Fonction qui permet d'écouter dès que l'un des input a un changement de sa valeur */
function onChangeInputsQuantity() {
  totalQuantity = 0; 

  const inputQuantity = document.querySelectorAll(".itemQuantity"); 
  const prices = document.querySelectorAll(".newPrice"); 

  inputQuantity.forEach((quantity) => { 
    quantity.addEventListener("change", (e) => { 
      let index = [...inputQuantity].indexOf(quantity); 
      cart[index].quantity = parseInt(e.target.value);
      let newPrice = cart[index].price * cart[index].quantity;
      localStorage.setItem("panier", JSON.stringify(cart));
 
      prices[index].innerText = `${newPrice} €`;
      sumQuantity();
      sumPrice();
    });
  });
}

/* Ici on affiche les différents produits dans le panier en utilisant innerHTML */ 
function getProductFromCart() {
  document.querySelector("#cart__items").innerHTML = "";

  cart.forEach((product) => {
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
  });
 
  addListenerDelete();
}

getProductFromCart();
onChangeInputsQuantity();
sumQuantity();
sumPrice();

// Création du formulaire pour le bon de validation
formContact.addEventListener("submit", (e) => {
e.preventDefault();
let firstNameContact = document.querySelector("#firstName");
let lastNameContact = document.querySelector("#lastName");
let addressContact = document.querySelector("#address");
let cityContact = document.querySelector("#city");
let emailContact = document.querySelector("#email");

/* Ici on check le retour de la fonction checkErrors (censée retourner true ou false) afin de savoir si la saisie des input est bonne ou non */ 
if (checkErrors(firstNameContact.value, lastNameContact.value, addressContact.value, cityContact.value, emailContact.value)) {}
/* Si il n'y a pas d'erreur alors la fonction retourne false et donc on rentre dans le else*/ 
else { 
  let order = {
    contact: {
      firstName: firstNameContact.value,
      lastName: lastNameContact.value,
      address: addressContact.value,
      city: cityContact.value,
      email: emailContact.value,
    },
    products: [],
  };

  /* Ici on va mettre dans le tableau les id des produits présents dans le panier */ 
  cart.forEach((product) => {
    order.products.push(product.id);
  });

  /* Ici on est encore dans le else (donc il n'y a pas d'erreur dans les input saisie car la fonction checkError retourne false) */
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((response) => {
      document.location.href = `confirmation.html?order=${response.orderId}`;
    }) 
    .catch((error) => {
      console.log(JSON.parse(error));
    });
}
e.preventDefault();
});
