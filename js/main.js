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

// Обработчики для слайдера (карусели) BEGIN
const $carouselItems = document.querySelectorAll(".carousel-section__item");

/**
 * Функция находит индекс активного слайда,
 * на вход принимает коллекцию HTML-узлов
 * @param {HTMLnodes} HTMLnodes
 * @returns Возвращает индекс активного слайда
 */
const getActiveSlide = (HTMLnodes) => {
    let result = null;
    const arrayOfNodes = Array.from(HTMLnodes);

    result = arrayOfNodes.findIndex((element) =>
        element.classList.contains("active")
    );

    return result;
};

/**
 * Функция обработчик нажатия кнопки "Следующий слайд".
 * Удаляет класс "active" из текущего слайда,
 * прибавляет класс "active" следующему слайду.
 * Ничего не возвращает.
 */
const showNextSlide = () => {
    let nextSlideIndex = null;

    const activeSlideIndex = getActiveSlide($carouselItems);

    $carouselItems[activeSlideIndex].classList.remove("active");
    nextSlideIndex = (activeSlideIndex + 1) % $carouselItems.length;
    $carouselItems[nextSlideIndex].classList.add("active");
};

/**
 * Функция обработчик нажатия кнопки "Предыдущий слайд".
 * Удаляет класс "active" из текущего слайда,
 * прибавляет класс "active" предыдущему слайду.
 * Ничего не возвращает.
 */
const showPreviousSlide = () => {
    let previousSlideIndex = null;

    const activeSlideIndex = getActiveSlide($carouselItems);

    $carouselItems[activeSlideIndex].classList.remove("active");
    previousSlideIndex = activeSlideIndex - 1;

    previousSlideIndex < 0 && (previousSlideIndex = $carouselItems.length - 1);
    $carouselItems[previousSlideIndex].classList.add("active");
};

document.addEventListener("click", (e) => {
    e.stopPropagation();

    let userClick = e.target;

    if (
        userClick.className === "carousel-section__next-slide-icon" ||
        userClick.className === "carousel-section__next-slide-button"
    ) {
        showNextSlide();
    }

    if (
        userClick.className === "carousel-section__prev-slide-icon" ||
        userClick.className === "carousel-section__prev-slide-button"
    ) {
        showPreviousSlide();
    }
});

//TODO: По хорошему, нужно удалить хард-код из HTML "номер слайда"
//      и выводить его динамически, в зависимости от кол-ва слайдов
//      чтобы при дальнейшем обслуживании не думать об этом

// Обработчики для слайдера (карусели) END
