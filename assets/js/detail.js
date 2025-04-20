let BASE_URL = "http://localhost:3000/products";

window.addEventListener("DOMContentLoaded", async () => {
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let URL = new URLSearchParams(location.search);
    let productId = URL.get("id");

    async function addDetails() {
        let res = await axios(BASE_URL);
        let products = res.data;
        let product = products.find(p => p.id == productId); 
        if (product) {
            let container = document.querySelector('.product-container');
            
            let productImageDiv = document.createElement('div');
            productImageDiv.classList.add('product-image');
            let img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            img.classList.add('img');
            productImageDiv.append(img);
            
            let productDetailsDiv = document.createElement('div');
            productDetailsDiv.classList.add('product-details');
            
            let productTitle = document.createElement('h1');
            productTitle.classList.add('product-title');
            productTitle.textContent = product.title;
            
            let productCategory = document.createElement('p');
            productCategory.classList.add('product-category');
            productCategory.textContent = `Category: Bag`; 
            
            let productPrice = document.createElement('p');
            productPrice.classList.add('product-price');
            productPrice.textContent = `$${product.price}`;
            
            let productDescription = document.createElement('p');
            productDescription.classList.add('product-description');
            productDescription.textContent = product.description;
            
            let productRating = document.createElement('div');
            productRating.classList.add('product-rating');
            let rating = document.createElement('span');
            rating.textContent = ` ${product.stars}`;
            let reviews = document.createElement('span');
            reviews.textContent = `(${product.rating} reviews)`;
            productRating.append(rating, reviews);
            
            let quantitySelector = document.createElement('div');
            quantitySelector.classList.add('quantity-selector');
            let btnMinus = document.createElement('button');
            btnMinus.classList.add('btn-minus');
            btnMinus.textContent = '-';

            btnMinus.addEventListener("click", () => {
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });

            let input = document.createElement('input');
            input.type = 'number';
            input.value = '1';
            input.min = '1';


            let btnPlus = document.createElement('button');
            btnPlus.classList.add('btn-plus');
            btnPlus.textContent = '+';

            btnPlus.addEventListener("click", () => {
                input.value = parseInt(input.value) + 1;
            });

            quantitySelector.append(btnMinus, input, btnPlus);
            
            let addToCartBtn = document.createElement('button');
            addToCartBtn.classList.add('btn', 'btn-danger', 'add-to-cart-btn');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.addEventListener("click", () => {
                let user = JSON.parse(localStorage.getItem("user")) || null;
                if (!user || !user.isLoggedIn) {
                    alert("Zəhmət olmasa daxil olun!");
                    window.location.href = "login.html";
                    return;
                }
            
                let basket = user.basket || [];
                let productIndex = basket.findIndex(item => item.id === product.id);
            
                if (productIndex !== -1) {
                    // Əgər artıq varsa, count-u artır
                    basket[productIndex].count += parseInt(input.value);
                } else {
                    // Əgər yoxdursa, əlavə et
                    basket.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        count: parseInt(input.value)
                    });
                }
            
                user.basket = basket;
                localStorage.setItem("user", JSON.stringify(user));
                alert("Məhsul səbətə əlavə olundu!");
            });
            
    
            productDetailsDiv.append(productTitle, productCategory, productPrice, productDescription, productRating, quantitySelector, addToCartBtn);
            container.append(productImageDiv, productDetailsDiv);
        } else {
            let errorMessage = document.createElement('p');
            errorMessage.textContent = 'Product not found';
            document.querySelector('.product-container').append(errorMessage);
        }
    }
    addDetails();
    
});
