//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");


// Si le panier est vide
function getCart() {
    if (produitLocalStorage === null || produitLocalStorage === 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in produitLocalStorage) { // Boucle des Elements de l'article
            
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
        
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
        
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = produitLocalStorage[produit].imgProduit;
            productImg.alt = produitLocalStorage[produit].altImgProduit;
            
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";
        
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
        
            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "20px";
        
            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
        
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";
        
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";
        
            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = produitLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
        
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        
            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";

        }
    }
}

getCart();

function getTotals() {

    // Récupération du total des quantités
    let elementQuantity = document.getElementsByClassName('itemQuantity');
    let myLength = elementQuantity.length,
    totalProduct = 0;

    for (let i = 0; i < myLength; ++i) {
        totalProduct += elementQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalProduct;
    console.table(totalProduct);

    // Récupération du prix total
    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elementQuantity[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.table(totalPrice);
}

getTotals();

// Modification d'une quantité de produit
function modifyQuantity() {
    const quantityModify = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityModify.length; i++) {
        quantityModify[i].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection element à modifier en fonction de son id et sa couleur
            let quantityModif = produitLocalStorage[i].quantiteProduit;
            let quantityModifyValue = quantityModify[i].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.quantityModifyValue !== quantityModif);

            resultFind.quantiteProduit = quantityModifyValue;
            produitLocalStorage[i].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // rafraichissement
            location.reload();
        })
    }
}

modifyQuantity()

// Suppression produit
function deleteProduct() {
    const btnDelete = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection element à supprimer en fonction de son id et sa couleur
            const idDelete = produitLocalStorage[i].idProduit;
            const colorDelete = produitLocalStorage[i].colorProduct;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.colorProduct !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            
            location.reload();
        })
    }
}

deleteProduct();
