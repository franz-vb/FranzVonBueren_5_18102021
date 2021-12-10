// Requêter l’API pour lui demander l’ensemble des produits  
function obtenirDonneeDeApi() {
  fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
          data.map((product) => {
              //insérer chaque produit dans la page d’accueil.
              document.querySelector(".items").innerHTML += `
                  <a href="./product.html?id=${product._id}">
                      <article>
                      <img src="${product.imageUrl}" alt=${product.altTxt}>
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                      </article>
                  </a>`;
          })
      });
};

obtenirDonneeDeApi();
