    let form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.querySelector(".username").value.trim();
    let password = document.querySelector(".password").value.trim();
    let savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        toasts("İstifadəçi tapilmadi. Zəhmət olmasa qeydiyyatdan keçin.");
        return;
    }

    if (username === savedUser.username && password === savedUser.password) {
        toasts("Giriş uğurludur! ");

        savedUser.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(savedUser));

        setTimeout(() => {
        window.location.href = "index.html";
        }, 1500);
    } else {
        toasts("Yanliş istifadəçi adi və ya şifrə!");
    }
    });
    function toasts(text) {
        Toastify({
        text: text,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right,rgb(221, 23, 40),rgb(161, 140, 112))",
        },
        }).showToast();
    }