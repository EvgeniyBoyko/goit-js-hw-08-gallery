import images from './gallery-items.js'

const portfolioContainer = document.querySelector('.js-gallery');
const parentPortfolioCard = document.querySelector('.js-lightbox');
const changeImages = document.querySelector('.lightbox__image');
const cardsMarkup = createsPortfolioCardsMarkup(images);

portfolioContainer.insertAdjacentHTML('beforeend', cardsMarkup);
portfolioContainer.addEventListener('click', onClickForModalOpen);
parentPortfolioCard.addEventListener('click', onClickForModalClose);
parentPortfolioCard.addEventListener('keydown', onScrollByPressBtn);

function createsPortfolioCardsMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link"
        href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/> 
        </a>
        </li>`;
    }).join(' ');
};

function onClickForModalClose(e) {
    if (parentPortfolioCard.classList.contains('is-open') && changeImages !== e.target) {
        parentPortfolioCard.classList.remove('is-open');
        clearLines()
    }
};

function onClickForModalOpen(e) {
    e.preventDefault();
    const targetClass = e.target.nodeName === 'IMG';
    if (!targetClass) {
        return;
    }
    parentPortfolioCard.classList.add('is-open');
    const activeTarget = e.target.dataset.source;
    changeImages.src = activeTarget;
    changeImages.alt = activeTarget.alt;
};

window.addEventListener("keydown", function (e) {
    if (e.code === 'Escape') {
        parentPortfolioCard.classList.remove('is-open');
        clearLines()
    }
});

function clearLines() {
    changeImages.src = '';
    changeImages.alt = '';
};

function onScrollByPressBtn(e) {
    // e.preventDefault();
    const scrollLeft = e.code === 'ArrowLeft';
    if (parentPortfolioCard.classList.contains('is-open')) {
        scrollLeft
    }
};
/*
1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
2.Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
3.Открытие модального окна по клику на элементе галереи.
4.Подмена значения атрибута src элемента img.lightbox__image.

5.Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
6.Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
*/