import "./styles/index.css";

// Получаем элемент книги
const bookElement = document.querySelector(".book-animated");
const bookSticker = document.querySelector(".book-animated__sticker");

// Добавляем обработчик события прокрутки
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // При прокрутке на 120px устанавливаем вращение на 15 градусов
  if (scrollY >= 120 && scrollY < 240) {
    bookElement.style.transform = "rotateY(15deg)";
    bookSticker.style.top = "-5%";
  }
  // При прокрутке на 240px устанавливаем вращение на 30 градусов
  else if (scrollY >= 240) {
    bookElement.style.transform = "rotateY(30deg)";
    bookSticker.style.top = "-10%";
  }
  // Если меньше 120px, возвращаем к исходной позиции (0 градусов)
  else {
    bookElement.style.transform = "rotateY(0deg)";
    bookSticker.style.top = "10%";
  }
});

window.addEventListener("scroll", function () {
  const stickerFrame = document.querySelector(
    ".features__sticker-frame::before"
  );
  const scrollPosition = window.scrollY;

  // Определяем смещение по горизонтали в зависимости от скролла
  let horizontalShift = scrollPosition * 0.03; // Коэффициент смещения, его можно регулировать

  // Применяем смещение через трансформацию
  document
    .querySelector(".features__sticker-frame")
    .style.setProperty("--horizontal-shift", `${horizontalShift}px`);
});

const quotesPages = document.querySelector(".quotes__pages");

quotesPages.addEventListener("wheel", (event) => {
  event.preventDefault();
  quotesPages.scrollBy({
    left: event.deltaY, // Горизонтальная прокрутка
    behavior: "smooth", // Плавная прокрутка
  });
});

quotesPages.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("quotes__page-img")) {
    openPopupImage(evt);
  }
});

const popupImage = document.querySelector(".popup-image");
const popupImg = popupImage.querySelector(".popup-image__img");

function openPopupImage(evt) {
  popupImg.src = `${evt.target.src}`;
  popupImage.classList.add("opened");
}

const closeButton = document.querySelector(".popup-image__close");

// Функция для закрытия попапа
function closePopup() {
  popupImage.classList.remove("opened");
}

// Закрытие по нажатию на крестик
closeButton.addEventListener("click", closePopup);

// Закрытие по нажатию мимо изображения
popupImage.addEventListener("click", (event) => {
  // Проверяем, был ли клик вне изображения (по области попапа)
  if (event.target !== popupImg && event.target !== closeButton) {
    closePopup();
  }
});

// Закрытие по клавише Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopup();
  }
});


document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // Рассчитаем изменение угла поворота в зависимости от прокрутки
  const rotateBefore = -120 + scrollPosition * 0.05;  // Угол для ::before
  const rotateAfter = 15 - scrollPosition * 0.05;  // Угол для ::after

  // Устанавливаем значения в CSS переменные
  document.querySelector('.authors').style.setProperty('--before-transform', `translateY(${scrollPosition * 0.01}px) translateX(${scrollPosition * 0.02}px) rotate(${rotateBefore}deg)`);
  document.querySelector('.authors').style.setProperty('--after-transform', `translateY(${scrollPosition * (-0.01)}px) translateX(${-scrollPosition * (0.02)}px) rotate(${rotateAfter}deg)`);
});


document.addEventListener('DOMContentLoaded', function() {
  const targets = document.querySelectorAll('.name-animated');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Исправлено здесь
          }
      });
  });

  targets.forEach(targetEl => observer.observe(targetEl));
});


