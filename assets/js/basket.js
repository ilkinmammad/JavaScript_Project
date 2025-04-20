let container = document.querySelector(".basket-container");

let user = JSON.parse(localStorage.getItem("user")) || { basket: [] };

user.basket.forEach(product => {

  let item = document.createElement("div");
  item.classList.add("basket-item");

  let img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  let details = document.createElement("div");
  details.classList.add("item-details");

  let title = document.createElement("h3");
  title.textContent = product.title;

  let price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;

  let quantityControls = document.createElement("div");
  quantityControls.classList.add("quantity-controls");

  let btnMinus = document.createElement("button");
  btnMinus.classList.add("btn-minus");
  btnMinus.textContent = "-";

  let input = document.createElement("input");
  input.type = "number";
  input.value = product.count || 1;
  input.min = "1";
  input.classList.add("quantity-input");

  let btnPlus = document.createElement("button");
  btnPlus.classList.add("btn-plus");
  btnPlus.textContent = "+";

  let totalPrice = document.createElement("p");
  totalPrice.classList.add("total-price");
  totalPrice.textContent = `Total: $${product.price * input.value}`;

  let btnRemove = document.createElement("button");
  btnRemove.classList.add("btn-remove");
  btnRemove.textContent = "Remove";
  
  btnRemove.addEventListener("click", () => {
    removeProductFromBasket(product.id);
    item.remove();  
  });

  btnPlus.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
    updateProductCount(product.id, parseInt(input.value));
    totalPrice.textContent = `Total: $${product.price * input.value}`;
  });

  btnMinus.addEventListener("click", () => {
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
      updateProductCount(product.id, parseInt(input.value));
      totalPrice.textContent = `Total: $${product.price * input.value}`;
    }
  });

  quantityControls.append(btnMinus, input, btnPlus);
  details.append(title, price, quantityControls, totalPrice,btnRemove);
  item.append(img, details);
  container.appendChild(item);
});



function updateProductCount(id, newCount) {
  let user = JSON.parse(localStorage.getItem("user")) || { basket: [] };
  let product = user.basket.find(p => p.id === id);
  if (product) {
    product.count = newCount;
    localStorage.setItem("user", JSON.stringify(user));
  }
}
function removeProductFromBasket(id) {
    let user = JSON.parse(localStorage.getItem("user")) || { basket: [] };
    user.basket = user.basket.filter(product => product.id !== id); 
    localStorage.setItem("user", JSON.stringify(user)); 
  }

  let homePage = document.querySelector(".logo")
  homePage.style.cursor="pointer"
homePage.addEventListener("click" , () => {
    window.location.href="index.html"
})
