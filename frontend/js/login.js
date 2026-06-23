const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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