// let cart = JSON.parse(localStorage.getItem("panier"));
// const formContact = document.querySelector(".cart__order__form");

// // Vérification du formulaire
// function checkErrors(firstNameContact, lastNameContact, addressContact, cityContact, emailContact) {
//   console.log(firstNameContact + " " + lastNameContact + " " + addressContact + " " + cityContact + " " + emailContact);
//   let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
//   let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
//   let addressErrorMsg = document.querySelector("#addressErrorMsg");
//   let cityErrorMsg = document.querySelector("#cityErrorMsg");
//   let emailErrorMsg = document.querySelector("#emailErrorMsg");

//   let isError = false;

//   const regexText = /[a-zA-Z\s\-À-ÖØ-öø-ÿ]+$/;
//   const regexEmail = /([a-z0-9.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//   const regexAddress = /^[a-zA-Z0-9,\s\-À-ÖØ-öø-ÿ]+$/;


//   if (!regexText.test(firstNameContact)) {
//     firstNameErrorMsg.textContent = "Le prénom n'est pas valide";
//     isError = true;
//   } else {
//     firstNameErrorMsg.textContent = "";
//   }
//   if (!regexText.test(lastNameContact)) {
//     lastNameErrorMsg.textContent = "Le nom n'est pas valide";
//     isError = true;
//   } else {
//     lastNameErrorMsg.textContent = "";
//   }
//   if (!regexAddress.test(addressContact)) {
//     addressErrorMsg.textContent = "L'adresse n'est pas valide";
//     isError = true;
//   } else {
//     addressErrorMsg.textContent = "";
//   }
//   if (!regexText.test(cityContact)) {
//     cityErrorMsg.textContent = "La ville n'est pas valide";
//     isError = true;
//   } else {
//     cityErrorMsg.textContent = "";
//   }
//   if (!regexEmail.test(emailContact)) {
//     emailErrorMsg.textContent = "L'email n'est pas valide";
//     isError = true;
//   } else {
//     emailErrorMsg.textContent = "";
//   }

//   return isError;
// }

// // Calcule de la quantité total
// function sumQuantity() {
//   let totalQuantity = 0;
//   const inputQuantity = document.querySelectorAll(".itemQuantity");
//   const finalQuantity = document.querySelector("#totalQuantity");
//   inputQuantity.forEach((quantity) => {
//     totalQuantity += parseInt(quantity.value);
//   });
//   finalQuantity.innerText = totalQuantity;
// }

// // Calcule du prix total
// function sumPrice() {
//   let totalPrice = 0;
//   const prices = document.querySelectorAll(".newPrice");
//   const finalPrice = document.querySelector("#totalPrice");
//   prices.forEach((price) => {
//     totalPrice += parseInt(price.innerText);
//   });
//   finalPrice.innerText = totalPrice;
// }

// // Suppression
// function deleteItem(btn) {
//   const btnsDelete = document.querySelectorAll(".deleteItem");
//   let index = [...btnsDelete].indexOf(btn);
//   cart.splice(index, 1);
//   localStorage.setItem("panier", JSON.stringify(cart));
//   getProductFromCart();
//   sumQuantity();
//   sumPrice();
// }

// function addListenerDelete() {
//   const btnsDelete = document.querySelectorAll(".deleteItem");
//   btnsDelete.forEach((btn) => {
//     btn.addEventListener("click", () => deleteItem(btn));
//   });
// }

// // Changement du prix selon la quantité
// function onChangeInputsQuantity() {
//   totalQuantity = 0;
//   const inputQuantity = document.querySelectorAll(".itemQuantity"); //inputQuantity tableau d'une collection d'éléments
//   const prices = document.querySelectorAll(".newPrice");
//   inputQuantity.forEach((quantity) => {
//     quantity.addEventListener("change", (e) => {
//       let index = [...inputQuantity].indexOf(quantity);
//       cart[index].quantity = parseInt(e.target.value);
//       let newPrice = cart[index].price * cart[index].quantity;
//       localStorage.setItem("panier", JSON.stringify(cart));

//       prices[index].innerText = `${newPrice} €`;
//       sumQuantity();
//       sumPrice();
//     });
//   });
// }

// // Vu sur les produit ajouter au panier
// function getProductFromCart() {
//   document.querySelector("#cart__items").innerHTML = "";

//   cart.forEach((product) => {
//     document.querySelector("#cart__items").innerHTML += `
//                     <article class="cart__item" data-id="${product.id}">
//                         <div class="cart__item__img">
//                         <img src="${product.img}" alt="Photographie d'un canapé">
//                         </div>
//                         <div class="cart__item__content">
//                         <div class="cart__item__content__titlePrice">
//                             <h2>${product.name}</h2>
//                             <p>${product.color}</p>
//                             <p class="newPrice">${product.price * product.quantity}€</p>
//                         </div>
//                         <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                               <p>Qté : </p>
//                               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"/>
//                             </div>
//                             <div class="cart__item__content__settings__delete">
//                               <p class="deleteItem">Supprimer</p>
//                             </div>
//                         </div>
//                         </div>
//                     </article>`;
//   });

//   addListenerDelete();
// }

// getProductFromCart();
// onChangeInputsQuantity();
// sumQuantity();
// sumPrice();

// // Création du formulaire pour le bon de validation
// formContact.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let firstNameContact = document.querySelector("#firstName");
//   let lastNameContact = document.querySelector("#lastName");
//   let addressContact = document.querySelector("#address");
//   let cityContact = document.querySelector("#city");
//   let emailContact = document.querySelector("#email");

//   if (checkErrors(firstNameContact.value, lastNameContact.value, addressContact.value, cityContact.value, emailContact.value)) {
//   } else {
//     let order = {
//       contact: {
//         firstName: firstNameContact.value,
//         lastName: lastNameContact.value,
//         address: addressContact.value,
//         city: cityContact.value,
//         email: emailContact.value,
//       },
//       products: [],
//     };

//     cart.forEach((product) => {
//       order.products.push(product.id);
//     });

//     fetch("http://localhost:3000/api/products/order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(order),
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         document.location.href = `confirmation.html?order=${response.orderId}`;
//       })
//       .catch((error) => {
//         console.log(JSON.parse(error));
//       });
//   }
//   e.preventDefault();
// });

let cart = JSON.parse(localStorage.getItem("panier"));
const formContact = document.querySelector(".cart__order__form");

// Vérification du formulaire
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
    /* Alors affiche le message d'erreur suivant */ 
    firstNameErrorMsg.textContent = "Le prénom n'est pas valide";
    /* Met le booléen à true */ 
    isError = true;
  } else {
    /* Sinon vide le message d'erreur afin qu'il s'en aille quand on corrige l'erreur */ 
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

  /* Retourne isErreor qui doit être true ou false. Cela nous service dans la dernière fonction afin de savoir si on envoie le formulaire (si le return est false) ou si on bloque (le return est true)*/ 
  return isError;
}

// Calcule de la quantité total
function sumQuantity() {
  let totalQuantity = 0;
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  const finalQuantity = document.querySelector("#totalQuantity");
  /* On parcours le tableau inputQuantity et pour chaque quantity on additionne sa somme dans la variable totalQuantity*/ 
  inputQuantity.forEach((quantity) => {
    /* On parse en int car les données sont récupérés en string */ 
    totalQuantity += parseInt(quantity.value);
  });
  /* On affiche dans l'élément HTML (final Quantity) la quantité globale */ 
  finalQuantity.innerText = totalQuantity;
}

// Calcule du prix total
function sumPrice() {
  let totalPrice = 0;
  const prices = document.querySelectorAll(".newPrice");
  const finalPrice = document.querySelector("#totalPrice");
  /* On parcours le tableau prices et pour chaque quantity on additionne sa somme dans la variable totalPrice*/ 
  prices.forEach((price) => {
    /* On parse en int car les données sont récupérés en string */ 
    totalPrice += parseInt(price.innerText);
  });
  /* On affiche dans l'élément HTML (final Quantity) la quantité globale */ 
  finalPrice.innerText = totalPrice;
}

// Fonction de suppression
/* On récupère en paramètre "btn" qui est en fait l'élément HTML supprimé sur lequel on a clické dans l'écouteur d'événements */ 
function deleteItem(btn) {
  /* On créé ici un tableau qui contient tous les éléments HTML deleteItem*/ 
  const btnsDelete = document.querySelectorAll(".deleteItem");
  /* On récupère l'index de l'élément "btn" dans le tableau btnsDelete qui est ici présent en tant que copie (on utilise pour cela le spread opérateur) */ 
  let index = [...btnsDelete].indexOf(btn);
  /* On utilise la fonction splice qui permet de supprimer un élément dans un tableau. On lui envoie deux paramètres : l'index à laquel supprimer l'élément et le nombre d'élément(s) à supprimer */ 
  cart.splice(index, 1);
  /* On met à jour le localStorage avec le nouveau tableau cart */ 
  localStorage.setItem("panier", JSON.stringify(cart));
  /* On call ici la fonction getProductFromCart afin de réafficher le nouveau panier (mise à jour car on a supprimé un élément) */
  getProductFromCart();
  /* On call ici sumQuantity afin d'afficher la nouvelle somme des quantité */ 
  sumQuantity();
  /* On call ici sumPrice afin d'afficher la nouvelle somme des prix */  
  sumPrice();
}

/* Ici on a une fonction qui va mettre en place un écouteur d'événements */ 
function addListenerDelete() {
  /* On créer un tableau btnsDelete qui est un tableau d'éléments HTML qui sont les boutons supprimés */ 
  const btnsDelete = document.querySelectorAll(".deleteItem");
  /* On boucle sur le tableau afin de mettre en place l'écouteur d'événements */ 
  btnsDelete.forEach((btn) => {
    /* Dès que l'un des bouton est clické alors on call la fonction deleteItem et on lui envoie en paramètre LE bouton sur lequel on a clické afin de récupérer plus tart son index */ 
    btn.addEventListener("click", () => deleteItem(btn));
  });
}

/* Fonction qui permet d'écouter dès que l'un des input a un changement de sa valeur */
function onChangeInputsQuantity() {
  totalQuantity = 0;
  /* On créé un tableau contenant les éléments HTML itemQuantity */ 
  const inputQuantity = document.querySelectorAll(".itemQuantity"); //inputQuantity tableau d'une collection d'éléments
  /* On créé un tableau contenant les éléments HTML newPrice */ 
  const prices = document.querySelectorAll(".newPrice");
  /* On boucle sur les input afin de mettre en place l'écouteur d'événements */ 
  inputQuantity.forEach((quantity) => {
    /* On écoute chaque input et on vérifie dès qu'il y a un changement dans la valeur de l'input */ 
    quantity.addEventListener("change", (e) => {
      /* Quand il y a un changement alors on récupère l'index de l'élément sur lequel on a changé en rapport avec le tableau inputQuantity */ 
      let index = [...inputQuantity].indexOf(quantity);
      /* On met ici à jour la quantité grace à l'index qu'on vient tout juste de récupérer et on lui met la valeur qui se trouve à e.target.value */ 
      cart[index].quantity = parseInt(e.target.value);
      /* On met à jour le prix en rapport avec le price général pour une unité et la quantité qu'on vient de changer */ 
      let newPrice = cart[index].price * cart[index].quantity;
      /* On met à jour le localStorage */ 
      localStorage.setItem("panier", JSON.stringify(cart));

      /* On affiche le nouveau prix dans l'élément HTML afin qu'on puisse le voir sur le site */ 
      prices[index].innerText = `${newPrice} €`;
      /* On remet à jour la quantité et le prix */ 
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

  /* Après avoir créé les éléments HTML, on met en place l'écouteur d'événement sur la suppression des produits */ 
  addListenerDelete();
}

getProductFromCart();
onChangeInputsQuantity();
sumQuantity();
sumPrice();

// Création du formulaire pour le bon de validation
formContact.addEventListener("submit", (e) => {
/* Permet d'éviter le chargement de la page */ 
e.preventDefault();
let firstNameContact = document.querySelector("#firstName");
let lastNameContact = document.querySelector("#lastName");
let addressContact = document.querySelector("#address");
let cityContact = document.querySelector("#city");
let emailContact = document.querySelector("#email");

/* Ici on check le retour de la fonction checkErrors (censée retourner true ou false) afin de savoir si la saisie des input est bonne ou non */ 
/* Si c'est true alors ca veut dire qu'il y a une erreur et donc on envoie pas le formulaire */ 
if (checkErrors(firstNameContact.value, lastNameContact.value, addressContact.value, cityContact.value, emailContact.value)) {}
/* Si il n'y a pas d'erreur alors la fonction retourne false et donc on rentre dans le else*/ 
else {
  /* On créé ici un objet qui contient les informations de la commande */ 
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
  /* On va faire une requête post vers l'API */ 
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((response) => {
      /* En réponse de l'API (donc ca a fonctionné) on se redirige vers la page confirmation et on lui envoie dans l'url l'orderId */ 
      document.location.href = `confirmation.html?order=${response.orderId}`;
    })
    /* En cas d'erreur de l'API on affiche dans la console l'erreur */ 
    .catch((error) => {
      console.log(JSON.parse(error));
    });
}
e.preventDefault();
});
