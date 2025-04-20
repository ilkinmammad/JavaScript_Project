function loadWishlist() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.isLoggedIn) {
        window.location.href = "register.html";
        return;
    }

    let wishlist = user.wishlist || [];
    let container = document.querySelector(".cards");
    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Wishlist boşdur.</p>";
        return;
    }

    wishlist.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("card");

        let heart = document.createElement("div");
        heart.classList.add("heart");
        let heartIcon = document.createElement("i");
        heartIcon.classList.add("fa-solid", "fa-heart");
        heart.appendChild(heartIcon);

        heart.addEventListener("click", () => {
            removeFromWishlist(product.id);
        });

        let img = document.createElement("img");
        img.classList.add("product-img");
        img.src = product.image;
        img.alt = "Product";

        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = product.title;

        let priceWrapper = document.createElement("div");

        let price = document.createElement("span");
        price.classList.add("price");
        price.textContent = `$${product.price}`;

        let oldPrice = document.createElement("span");
        oldPrice.classList.add("old-price");
        oldPrice.textContent = `From $${product.oldPrice}`;

        priceWrapper.appendChild(price);
        priceWrapper.appendChild(oldPrice);

        card.append(heart, img, title, priceWrapper);
        container.appendChild(card);
    });
}


function removeFromWishlist(productId) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.wishlist = user.wishlist.filter(p => p.id !== productId);
    localStorage.setItem("user", JSON.stringify(user));
    loadWishlist();
}

loadWishlist();

let homePage = document.querySelector(".logo")
homePage.style.cursor="pointer"

homePage.addEventListener("click" , () => {
    window.location.href="index.html"
})
