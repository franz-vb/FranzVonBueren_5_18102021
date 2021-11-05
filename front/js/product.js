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

btnPanier.addEventListener("click", () => {

    //Stocker le localStorage dans le tableau cart
    let cart = JSON.parse(localStorage.getItem(`${idProduct}`));

    //On vérifie si dans le localStorage se trouve la clé "idProduct"
    if (localStorage.getItem(`${idProduct}`)) {


        //Si oui alors on va boucler afin de vérifier les éléments pairs qui sont censés être la couleur
        for (let i = 0; i < cart.length; i = i + 2) {

            //Si la couleur qu'on a sélectionné (productColorsOptions.value) est égale à celle présente dans l'Item du localStorage, alors : 
            if (cart[i] == productColorsOptions.value) {
                //On modifier la quantité de cette couleur
                //Et on balance la variable booléenne isColorPresent à true
                isColorPresent = true;    
                cart[i + 1] += parseInt(itemQty.value);
                localStorage.setItem(`${idProduct}`, JSON.stringify(cart));
                break;
            }

            //Si la couleur sélectionnée n'est pas la même que la couleur de l'Item, alors on passe le booléen isColorPresent à false
            //On utilise ici un booléen car si dans le else on push des nouveaux éléments dans le tableau cart, on va créer une boucle infini car mon FOR est dépendant 
            //d'une longueur et cette longueur est modifiée à chaque fois.
            else {
                isColorPresent = false;
            }
        }

        //Si le booléen isColorPresent est à False, cela veut dire qu'on a séléctionnée un produit déjà présent dans le local mais qui a une couleur différente

        if (!isColorPresent) {

            //Donc on ajoute deux nouveaux éléments au tableau cart avec la nouvelle couleur et la nouvelle quantité
            //On push dans le tableau la nouvelle couleur
            cart.push(productColorsOptions.value);
            //On push dans le tableau la nouvelle quantité
            cart.push(parseInt(itemQty.value));
            //On met à jour le localStorage en pushant le nouveau tableau qui contient les nouveaux éléments
            localStorage.setItem(`${idProduct}`, JSON.stringify(cart));

        }  
    }

    else {

        localStorage.setItem(`${idProduct}`, JSON.stringify([productColorsOptions.value, parseInt(itemQty.value)]));
        alert("Produit ajouté au panier");
    }

})

getProductFromId();