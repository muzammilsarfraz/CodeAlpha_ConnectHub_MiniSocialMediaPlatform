const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
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

        const response = await fetch("http://localhost:3000/api/users/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        showToast(data.message);

        if (response.ok) {

            window.location.href = "login.html";

        }

    } catch (error) {

        console.log(error);

        showToast("Something went wrong!");

    }

});