
let form = document.querySelector(".form")
let btnComplate = document.querySelector(".btnComplate")

form.addEventListener("submit",(e) => {
  e.preventDefault()

  let name = document.querySelector('.name').value;
  let username = document.querySelector('.username').value;
  let email = document.querySelector('.email').value;
  let password = document.querySelector('.password').value;

  if (!username || !password || !email || !name) {
    toasts("Xanalar boş qala bilməz!");
    return;
  }
  
  const user = { name, username, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
  toasts("Qeydiyyat uğurla tamamlandi!");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);


})








function toasts(text) {
    Toastify({
      text: text,
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }