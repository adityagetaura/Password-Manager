document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("passwordForm");
    const list = document.getElementById("passwordList");

    function loadPasswords() {
        list.innerHTML = "";
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];

        passwords.map((entry, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${entry.website}</strong>: <span class="masked">******</span>
                <button onclick="togglePassword(this, '${entry.password}')">Show</button>
                <button onclick="deletePassword(${index})">Delete</button>
            `;
            list.appendChild(li);
        });
    }

    function savePassword(e) {
        e.preventDefault();
        const website = document.getElementById("website").value;
        const password = document.getElementById("password").value;

        if (!website || !password) return alert("Please enter both website and password!");

        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.push({ website, password });
        localStorage.setItem("passwords", JSON.stringify(passwords));

        form.reset();
        loadPasswords();
    }

    window.togglePassword = (btn, password) => {
        const span = btn.previousElementSibling;
        span.textContent = span.textContent === "******" ? password : "******";
        btn.textContent = btn.textContent === "Show" ? "Hide" : "Show";
    };

    window.deletePassword = (index) => {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.splice(index, 1);
        localStorage.setItem("passwords", JSON.stringify(passwords));
        loadPasswords();
    };

    form.addEventListener("submit", savePassword);
    loadPasswords();
});
