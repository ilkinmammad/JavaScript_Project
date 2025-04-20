let products = [];
let BASE_URL = "http://localhost:3000/products";

async function addCards() {
    let res = await axios(BASE_URL);
    products = res.data;

    let cards = document.querySelector(".cards");

    products.forEach(product => {
        let card = document.createElement("div");
        card.classList.add('card');

        let badge = document.createElement('div');
        badge.classList.add('badge');
        badge.textContent = `${product.badge}`;

        let heart = document.createElement('div');
        heart.classList.add('heart');
        let heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-heart');

        
        if (isInWishlist(product.id)) {
            heartIcon.classList.add('fa-solid');
        } else {
            heartIcon.classList.add('fa-regular');
        }

        heart.appendChild(heartIcon);

        let img = document.createElement('img');
        img.classList.add('product-img');
        img.src = product.image;
        img.alt = "Product";

        
    img.addEventListener("click", () => {
        window.location.href = `detail.html?id=${product.id}`;

    });

        let stars = document.createElement('div');
        stars.classList.add('stars');
        stars.textContent = `${product.stars}`;

        let title = document.createElement('div');
        title.classList.add('title');
        title.textContent = product.title;

        let priceWrapper = document.createElement('div');

        let price = document.createElement('span');
        price.classList.add('price');
        price.textContent = `$${product.price}`;

        let oldPrice = document.createElement('span');
        oldPrice.classList.add('old-price');
        oldPrice.textContent = `From $${product.oldPrice}`;

        priceWrapper.appendChild(price);
        priceWrapper.appendChild(oldPrice);

        let btnAdd = document.createElement('button');
        btnAdd.classList.add('btnadd');
        btnAdd.textContent = "Add to cart";
        btnAdd.addEventListener("click", () => {
            let user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.isLoggedIn == true) {
                alert("Please log in first.");
                return;
            }
            user.basket = user.basket || [];
            const alreadyInBasket = user.basket.find(item => item.id === product.id);
            if (!alreadyInBasket) {
                user.basket.push(product);
            }
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "basket.html";
        });
        

        heart.addEventListener("click", () => {
            toggleWishlist(product, heartIcon);
        });

        card.append(badge, heart, img, stars, title, priceWrapper, btnAdd);

        cards.appendChild(card);
    });
}

addCards();

function toggleWishlist(product, iconElement) {
    let user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.isLoggedIn) {
        alert("Please log in to use wishlist.");
        return;
    }

    user.wishlist = user.wishlist || [];

    const productIndex = user.wishlist.findIndex(p => p.id === product.id);

    if (productIndex === -1) {
        user.wishlist.push(product);
        iconElement.classList.remove('fa-regular');
        iconElement.classList.add('fa-solid');
    } else {
        user.wishlist.splice(productIndex, 1);
        iconElement.classList.remove('fa-solid');
        iconElement.classList.add('fa-regular');
    }

    localStorage.setItem('user', JSON.stringify(user));
}

function isInWishlist(productId) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.wishlist) return false;

    return user.wishlist.some(p => p.id === productId);
}

function getSignup() {
    let signUpBtn = document.querySelector(".signup");
    let icons = document.querySelector(".icons");

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.isLoggedIn == true) {
        signUpBtn.style.display = "none";

        let userNameSpan = document.createElement("span");
        userNameSpan.textContent = `${savedUser.username}`;
        userNameSpan.classList.add("savedUsername");

        icons.appendChild(userNameSpan);

        let logOutBtn = document.createElement("button");
        logOutBtn.textContent = "Logout";
        logOutBtn.classList.add("logout-btn");
        icons.appendChild(logOutBtn);
    }

    signUpBtn.addEventListener("click", () => {
        window.location.href = "register.html";
    });
}

getSignup();

function getLogOut() {
    let logOutBtn = document.querySelector(".logout-btn");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", () => {
            let savedUser = JSON.parse(localStorage.getItem("user"));
            if (savedUser) {
                savedUser.isLoggedIn = false;
                localStorage.setItem("user", JSON.stringify(savedUser));
            }

            if (savedUser.isLoggedIn == false) {
                let logOutBtn = document.querySelector(".logout-btn");
                logOutBtn.style.display = "none";
                let userNameSpan = document.querySelector(".savedUsername");
                userNameSpan.style.display = "none";
                let signUpBtn = document.querySelector(".signup");
                signUpBtn.style.display = "block";
            }
            savedUser.wishlist = [];
            localStorage.setItem("user", JSON.stringify(savedUser));

            resetHeartIcons();
        });
    }
}

getLogOut();

function resetHeartIcons() {
    let heartIcons = document.querySelectorAll('.heart i');
    heartIcons.forEach(icon => {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    });
}

let wishlist = document.querySelector(".wishlist");
wishlist.addEventListener("click", () => {
    window.location.href = "favories.html"; 
});

let basket = document.querySelector(".basket");
basket.addEventListener("click", () => {
    window.location.href = "basket.html"; 
});
