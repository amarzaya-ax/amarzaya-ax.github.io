const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

let isAdmin = false;

// === 1. Admin login ===
const adminBtn = document.getElementById("adminBtn");
const popup = document.getElementById("adminLoginPopup");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminControls = document.getElementById("admin-controls");

adminBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

function handleLogin() {
    const password = document.getElementById("adminPassword").value;
    const loginError = document.getElementById("loginError");

    if (password === "admin123") { // ← энд хүссэн нууц үгээ бичнэ
        isAdmin = true;
        popup.style.display = "none";
        loginError.textContent = "";

        enableEditing(true);
        loadSavedContent();
        adminControls.style.display = "block";

        alert("Амжилттай админ эрхээр нэвтэрлээ.");
    } else {
        loginError.textContent = "Нууц үг буруу байна!";
    }
}

// === 2. Enable or disable content editing ===
function enableEditing(enable) {
    document.querySelectorAll(".editable").forEach(el => {
        el.contentEditable = enable;
        el.style.outline = enable ? "1px dashed gray" : "none";
    });
}

// === 3. Save button ===
saveBtn.addEventListener("click", () => {
    document.querySelectorAll(".editable").forEach((el, index) => {
        localStorage.setItem(`editable-${index}`, el.innerHTML);
    });
    alert("Засварууд хадгалагдлаа!");
});

// === 4. Load saved content ===
function loadSavedContent() {
    document.querySelectorAll(".editable").forEach((el, index) => {
        const saved = localStorage.getItem(`editable-${index}`);
        if (saved) el.innerHTML = saved;
    });
}

// === 5. Logout ===
logoutBtn.addEventListener("click", () => {
    enableEditing(false);
    adminControls.style.display = "none";
    isAdmin = false;
});

// === 6. Load saved content on page load ===
window.onload = () => {
    loadSavedContent();
};
