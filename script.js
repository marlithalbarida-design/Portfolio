const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme") || "light";
body.classList.add(savedTheme);

toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

toggleBtn.addEventListener("click", () => {

    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        toggleBtn.textContent = "☀️"; 
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.replace("dark", "light");
        toggleBtn.textContent = "🌙"; 
        localStorage.setItem("theme", "light");
    }
});