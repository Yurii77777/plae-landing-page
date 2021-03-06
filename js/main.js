"use strict";

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
const $dotsSpans = document.querySelectorAll(".navigation-dots__dot");

for (let element of $navDots) {
    element.addEventListener("click", (e) => {
        e.preventDefault();

        const link = element.getAttribute("href");

        document.querySelector(link).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

// Прокрутка страницы по нажатию на кнопки навигации nav dots END

// Отследить позицию пользователя на странице
// и выделить необходимую точку навигации BEGIN
const $topSection = document.getElementById("top-section");
const $aboutSection = document.getElementById("about-section");
const $reviewsSection = document.getElementById("reviews-section");
const $carouselSection = document.getElementById("carousel-section");
const $whyPlaeSection = document.getElementById("why-plae-section");
const $addressesSection = document.getElementById("addresses-section");

const elementInViewport = (el) => {
    const bounds = el.getBoundingClientRect();
    let isVisible = (bounds.top / window.innerHeight) * 100 < 50;

    return isVisible;
};

const handleNavDotInViewport = (element) => {
    for (let span of $dotsSpans) {
        span.classList.contains("active") && span.classList.remove("active");
    }

    element.classList.add("active");
};

window.addEventListener("scroll", (e) => {
    const isTopSectioninViewport = elementInViewport($topSection);
    const isAboutSectioninViewport = elementInViewport($aboutSection);
    const isReviewsSectioninViewport = elementInViewport($reviewsSection);
    const isCarouselSectioninViewport = elementInViewport($carouselSection);
    const isWhyPlaeSectioninViewport = elementInViewport($whyPlaeSection);
    const isAddressesSectioninViewport = elementInViewport($addressesSection);

    const $topSectionSpan = $dotsSpans[0];
    const $aboutSectionSpan = $dotsSpans[1];
    const $reviewsSectionSpan = $dotsSpans[2];
    const $carouselSectionSpan = $dotsSpans[3];
    const $whyPlaeSectionSpan = $dotsSpans[4];
    const $addressesSectionSpan = $dotsSpans[5];

    isTopSectioninViewport && handleNavDotInViewport($topSectionSpan);
    isAboutSectioninViewport && handleNavDotInViewport($aboutSectionSpan);
    isReviewsSectioninViewport && handleNavDotInViewport($reviewsSectionSpan);
    isCarouselSectioninViewport && handleNavDotInViewport($carouselSectionSpan);
    isWhyPlaeSectioninViewport && handleNavDotInViewport($whyPlaeSectionSpan);
    isAddressesSectioninViewport &&
        handleNavDotInViewport($addressesSectionSpan);
});

// Отследить позицию пользователя на странице
// и выделить необходимую точку навигации END
