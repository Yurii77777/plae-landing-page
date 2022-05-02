"use strict";

// Логика для стилизации лейбла инпута e-mail BEGIN
const $emailInput = document.getElementById("email");

$emailInput.addEventListener("focus", (e) => {
    e.stopPropagation();

    !$emailInput.classList.contains("active") &&
        $emailInput.classList.add("active");
});

$emailInput.addEventListener("blur", (e) => {
    e.stopPropagation();

    const emailInputValue = e.target.value;
    let isEmailInputEmpty = emailInputValue === "" || !emailInputValue;

    isEmailInputEmpty && $emailInput.classList.remove("active");
});
// Логика для стилизации лейбла инпута e-mail END
