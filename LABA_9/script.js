const tabButtons = document.querySelectorAll(".tab-btn");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const successMessage = document.getElementById("successMessage");


tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tab = button.dataset.tab;
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        signupForm.classList.toggle("active", tab === "signup");
        loginForm.classList.toggle("active", tab === "login");
        hideSuccess();
    });
});


document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        if (input.type === "password") {
            input.type = "text";
            button.textContent = "🙈";
        } else {
            input.type = "password";
            button.textContent = "👁";
        }
    });
});


signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateSignup()) {
        const formData = Object.fromEntries(new FormData(signupForm).entries());
        console.log("Signup Data:", formData);
        
        showSuccess("Registered successfully!");
        signupForm.reset();
        resetStyles(signupForm);
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateLogin()) {
        const formData = Object.fromEntries(new FormData(loginForm).entries());
        console.log("Login Data:", formData);

        showSuccess("Login successful!");
        loginForm.reset();
        resetStyles(loginForm);
    }
});


function validateSignup() {
    let isValid = true;
    const user = document.getElementById("signupUser");
    const email = document.getElementById("signupEmail");
    const pass = document.getElementById("signupPass");
    const repass = document.getElementById("confirmPass");

    if (user.value.trim().length < 3) isValid = setInvalid(user, "At least 3 characters.");
    else setValid(user);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) isValid = setInvalid(email, "Enter valid email address.");
    else setValid(email);

    if (pass.value.trim().length < 6) isValid = setInvalid(pass, "At least 6 characters.");
    else setValid(pass);

    if (repass.value.trim() === "" || repass.value !== pass.value) isValid = setInvalid(repass, "Passwords do not match.");
    else setValid(repass);

    return isValid;
}

function validateLogin() {
    let isValid = true;
    const user = document.getElementById("loginUser");
    const pass = document.getElementById("loginPass");

    if (user.value.trim() === "") isValid = setInvalid(user, "Username is required.");
    else setValid(user);

    if (pass.value.trim().length < 6) isValid = setInvalid(pass, "At least 6 characters.");
    else setValid(pass);

    return isValid;
}


function setInvalid(field, message) {
    field.classList.remove("valid");
    field.classList.add("invalid");
    const error = field.closest(".form-group").querySelector(".error");
    error.textContent = message;
    error.classList.remove("success-text");
    return false; // Повертає false для зручності у валідаторі
}

function setValid(field) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    const error = field.closest(".form-group").querySelector(".error");
    error.textContent = "Looks good!";
    error.classList.add("success-text");
}

function resetStyles(form) {
    form.querySelectorAll("input").forEach(f => f.classList.remove("valid", "invalid"));
    form.querySelectorAll(".error").forEach(e => {
        e.textContent = "";
        e.classList.remove("success-text");
    });
}

function showSuccess(msg) {
    successMessage.textContent = msg;
    successMessage.classList.add("show");
}

function hideSuccess() {
    successMessage.classList.remove("show");
}