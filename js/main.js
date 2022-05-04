"use strict";

// Логика для стилизации лейблов инпутов e-mail BEGIN
/**
 * Функция добавляет или удаляет класс "active",
 * в зависимости от того, есть ли данный класс сейчас
 * в переданном HTML узле
 * @param {HTMLnode} $node
 */
const handleActiveClassNames = ($node) => {
    !$node[0].classList.contains("active")
        ? $node[0].classList.add("active")
        : $node[0].classList.add("active");
};

const $emailInput = document.querySelectorAll(".top-section__input-email");

$emailInput[0].addEventListener("focus", (e) => {
    e.stopPropagation();

    handleActiveClassNames($emailInput);
});

$emailInput[0].addEventListener("blur", (e) => {
    e.stopPropagation();

    const emailInputValue = e.target.value;
    let isEmailInputEmpty = emailInputValue === "" || !emailInputValue;

    isEmailInputEmpty && $emailInput[0].classList.remove("active");
});

const $footerEmailInput = document.querySelectorAll(".footer__input-email");

$footerEmailInput[0].addEventListener("focus", (e) => {
    e.stopPropagation();

    handleActiveClassNames($footerEmailInput);
});

$footerEmailInput[0].addEventListener("blur", (e) => {
    e.stopPropagation();

    const emailInputValue = e.target.value;
    let isEmailInputEmpty = emailInputValue === "" || !emailInputValue;

    isEmailInputEmpty && $footerEmailInput[0].classList.remove("active");
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

// Прокрутка страницы по нажатию на кнопки навигации nav dots BEGIN
const $navDots = document.querySelectorAll('a[href^="#"]');
const $dotsSpans = document.querySelectorAll(".top-section__navigation-dot");

for (let element of $navDots) {
    element.addEventListener("click", (e) => {
        e.preventDefault();

        let userClick = e.target;

        const link = element.getAttribute("href");

        document.querySelector(link).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        for (let span of $dotsSpans) {
            span.classList.contains("active") &&
                span.classList.remove("active");
        }

        userClick.classList.add("active");
    });
}

// Прокрутка страницы по нажатию на кнопки навигации nav dots END
