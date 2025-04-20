
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toasts("Zəhmət olmasa düzgün e-poçt daxil edin.");
    return;
  }

  if (username.length < 6) {
    toasts("İstifadəçi adi ən azi 6 simvol olmaldir.");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  if (!passwordRegex.test(password)) {
    toasts("Şifrə ən azi 1 böyük hərf, 1 rəqəm və 1 simvol ibaret olmalidir.");
    return;
  }
  
  const user = { name, username, email, password , isLoggedIn: true ,wishlist:[] ,basket:[]};
  localStorage.setItem("user", JSON.stringify(user));

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