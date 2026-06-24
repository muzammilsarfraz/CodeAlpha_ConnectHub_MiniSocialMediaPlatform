const form = document.getElementById("loginForm");
console.log("login.js loaded");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.className = "";

    toast.classList.add(type);

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

    try {

        const response = await fetch("http://localhost:3000/api/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            showToast(data.message, "error");

            return;

        }

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        showToast("Login Successful", "success");

        window.location.href = "index.html";

    } catch (error) {

        console.log(error);

    }

});