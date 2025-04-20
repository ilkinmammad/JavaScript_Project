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

function getSignup() {
    let signUpBtn = document.querySelector(".signup")
    signUpBtn.addEventListener("click",() => {
        window.location.href= "register.html"
    })
}
getSignup()
