const urlParams = new URLSearchParams(window.location.search); 
const idProduct = urlParams.get("id");
const btnPanier = document.querySelector("#addToCart");
const itemQty = document.querySelector('#quantity');
let isColorPresent = true;

let myProduct; 
let productTitle = document.querySelector("#title");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let productImg = document.querySelector(".item__img");
let productColorsOptions = document.querySelector('#colors');

function getProductFromId() {
    fetch("http://localhost:3000/api/products/" + idProduct )
    .then(response => response.json())
    .then(product => { 

        productTitle.textContent = `${product.name}`;
        productDescription.textContent = `${product.description}`
        productPrice.textContent = `${product.price}`;
        productImg.innerHTML += `<img src=${product.imageUrl} alt=Photographie d'un canapé />`;

        product.colors.map((color) => {
            productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
        })
    });

};

//Ajouter ua panier.
btnPanier.addEventListener("click", () => {

    //Stocker le localStorage dans le tableau cart
    let cart = JSON.parse(localStorage.getItem(`${idProduct}`));

    //On vérifie si dans le localStorage se trouve la clé "idProduct"
    if (localStorage.getItem(`${idProduct}`)) {

        //boucler afin de vérifier les éléments pairs = couleur.
        for (let i = 0; i < cart.length; i = i + 2) {

            //couleur qu'on a sélectionnée est égale à celle présente dans l'Item du localStorage
            if (cart[i] == productColorsOptions.value) {
                isColorPresent = true; 
                //On modifier la quantité de cette couleur 
                cart[i + 1] += parseInt(itemQty.value);  
                localStorage.setItem(`${idProduct}`, JSON.stringify(cart));
                break;
            }

            //Si la couleur sélectionnée n'est pas la même que la couleur de l'Item, alors on passe le booléen isColorPresent à false
            //On utilise ici un booléen car si dans le else on push des nouveaux éléments dans le tableau cart, on va créer une boucle infini 
            //car mon FOR est dépendant d'une longueur et cette longueur est modifiée à chaque fois.
            else {
                isColorPresent = false;
            }
        }

        //Si le booléen isColorPresent est à False, cela veut dire qu'on a séléctionnée un produit déjà présent dans le local mais qui a 
        //une couleur différente.

        if (!isColorPresent) {

            //Donc on ajoute deux nouveaux éléments au tableau cart
            cart.push(productColorsOptions.value);
            cart.push(parseInt(itemQty.value));
            localStorage.setItem(`${idProduct}`, JSON.stringify(cart));

        }  
    }

    else {//Quand j'appuie sur panier, si idProduct n'existe pas dans le localStorage alors éxécute le code suivant
        //Ajoute au localStorage un nouvel item qui contient une clé (idProduct) et une valeur (ici un tableau qui contient la couleur 
        //sélectionnée ainsi que la quantité)

        localStorage.setItem(`${idProduct}`, JSON.stringify([productColorsOptions.value, parseInt(itemQty.value)]));
        alert("Produit ajouté au panier");
    }

})

getProductFromId();