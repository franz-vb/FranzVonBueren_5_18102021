
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
        
        function getProductFromId() {
          fetch("http://localhost:3000/api/products/" + idProduct )
          .then(response => response.json())
          .then(product => { 
        
              productName.textContent = `${product.name}`;
              productDescription.textContent = `${product.description}`
              productPrice.textContent = `${product.price}`;
              productImg.innerHTML += `<img id=productImg src=${product.imageUrl} alt=Photographie d'un canapé />`;
        
              product.colors.forEach((color) => {
                  productColorsOptions.innerHTML += `<option value="${color}">${color}</option>`;
              })
          });
        };
        
        getProductFromId();
                       
        btnCart.addEventListener("click", (e) => {

          isPresent = false;
          
          if (localStorage.getItem("panier")) {
            cart = JSON.parse(localStorage.getItem("panier"));
            //console.log(cart);
            cart.forEach((product) => { //product : valeur de l'élément(objet) du tableau.
              //produits dans le panier
              //console.log(product.name + product.color);
              //nouveau produit sélectionné
              //console.log(productName.textContent + productColorsOptions.value);
              if (product.id + product.color == idProduct + productColorsOptions.value) {
                //console.log("egal");
                product.quantity += parseInt(quantity.value);
                localStorage.setItem("panier", JSON.stringify(cart));
                isPresent = true;
                //console.log("test 1" + isPresent);
              }

            });
          } else {
            cart = [];
            cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
            localStorage.setItem("panier", JSON.stringify(cart));
            isPresent = true;
            //console.log("test 3" + isPresent);
          }
           if (!isPresent) {
            cart.push({id: idProduct, quantity: parseInt(quantity.value), color: productColorsOptions.value, name: productName.textContent, price: productPrice.textContent, img: document.querySelector("#productImg").src});
            localStorage.setItem("panier", JSON.stringify(cart));
            //console.log("test 4" + isPresent);
           } 
        });
        
        
        
        
        
        
            
        