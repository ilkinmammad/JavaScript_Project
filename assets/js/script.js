let BASE_URL = "http://localhost:3000/products"


async function addCards() {
    let res = await axios(BASE_URL)
    let products = res.data
   
    
    let cards = document.querySelector(".cards")
    
    products.forEach(product => {
        let card = document.createElement("div")
        card.classList.add('card');

        let badge = document.createElement('div');
        badge.classList.add('badge');
        badge.textContent = `${product.badge}`;

        let heart = document.createElement('div');
        heart.classList.add('heart');
        let heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-regular', 'fa-heart');
        heart.appendChild(heartIcon);

        let img = document.createElement('img');
        img.classList.add('product-img');
        img.src = product.image;
        img.alt = "Product";

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


        card.append(badge,heart,img,stars,title,priceWrapper,btnAdd)
        
        cards.appendChild(card);
    });

}
addCards()


function toggleWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const productIndex = wishlist.findIndex(p => p.id === product.id);

    if (productIndex === -1) {
        wishlist.push(product);
    } else {
        wishlist.splice(productIndex, 1);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Product added to cart!");
}

function getSignup() {
    let signUpBtn = document.querySelector(".signup")
    let icons = document.querySelector(".icons")

    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.isLoggedIn == true) {
        signUpBtn.style.display = "none";

        let userNameSpan = document.createElement("span");
        userNameSpan.textContent = `${savedUser.username}`;
        userNameSpan.classList.add("savedUsername")

        icons.appendChild(userNameSpan);

        let logOutBtn = document.createElement("button");
        logOutBtn.textContent = "Logout";
        logOutBtn.classList.add("logout-btn");
        icons.appendChild(logOutBtn);
    }

    signUpBtn.addEventListener("click",() => {
        window.location.href= "register.html"
    })
}
getSignup()

function getLogOut() {
    let logOutBtn = document.querySelector(".logout-btn")

    if (logOutBtn) {
        logOutBtn.addEventListener("click",() => {
            let savedUser = JSON.parse(localStorage.getItem("user"));
            if (savedUser) {
                savedUser.isLoggedIn = false;
                localStorage.setItem("user", JSON.stringify(savedUser));
            }
    
            if (savedUser.isLoggedIn == false) {
                let logOutBtn = document.querySelector(".logout-btn")
                logOutBtn.style.display = "none";
                let userNameSpan = document.querySelector(".savedUsername");
                userNameSpan.style.display = "none";
                let signUpBtn = document.querySelector(".signup")
                signUpBtn.style.display = "block";

            }
        })
    }
}
getLogOut()


// function sortAZ() {
//     let sorted = [...].sort((a, b) => a.title.localeCompare(b.title));
//     addCards(sorted);
// }

// function sortZA() {
//     let sorted = [...].sort((a, b) => b.title.localeCompare(a.title));
//     addCards(sorted);
// }

// document.querySelector(".sortAZ").addEventListener("click", sortAZ);
// document.querySelector(".sortZA").addEventListener("click", sortZA);
