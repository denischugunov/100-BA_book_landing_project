import "./styles/index.css";

const burgerMenuBtn = document.querySelector("#burgerMenuBtn");
const burgerMenu = document.querySelector("#burgerMenu");

burgerMenuBtn.addEventListener("click", (evt) => {
  burgerMenuBtn.classList.toggle("active");
  burgerMenu.classList.toggle("active");
});

// Получаем элемент книги
const bookElement = document.querySelector(".book-animated");
const bookSticker = document.querySelector(".book-animated__sticker");

// Добавляем обработчик события прокрутки
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // При прокрутке на 120px устанавливаем вращение на 15 градусов
  if (scrollY >= 60 && scrollY < 120) {
    bookElement.style.transform = "rotateY(15deg)";
    bookSticker.style.top = "-8%";
  }
  // При прокрутке на 240px устанавливаем вращение на 30 градусов
  else if (scrollY >= 120) {
    bookElement.style.transform = "rotateY(30deg)";
    bookSticker.style.top = "-12%";
  }
  // Если меньше 120px, возвращаем к исходной позиции (0 градусов)
  else {
    bookElement.style.transform = "rotateY(0deg)";
    bookSticker.style.top = "10%";
  }
});

window.addEventListener("scroll", function () {
  const stickerFrame = document.querySelector(
    ".features__sticker-frame::before",
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
  const maxScrollLeft = quotesPages.scrollWidth - quotesPages.clientWidth;

  // Проверяем, достиг ли пользователь конца контейнера
  if (
    (quotesPages.scrollLeft === maxScrollLeft && event.deltaY > 0) ||
    (quotesPages.scrollLeft === 0 && event.deltaY < 0)
  ) {
    // Если достигнут конец или начало контейнера, не отменяем событие - стандартная вертикальная прокрутка работает
    return;
  }

  // В остальных случаях предотвращаем стандартную прокрутку
  event.preventDefault();

  // Увеличиваем скорость горизонтальной прокрутки, умножая deltaY на 3
  quotesPages.scrollBy({
    left: event.deltaY * 3, // Увеличиваем скорость прокрутки
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

document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Рассчитаем изменение угла поворота в зависимости от прокрутки
  const rotateBefore = -120 + scrollPosition * 0.05; // Угол для ::before
  const rotateAfter = 15 - scrollPosition * 0.05; // Угол для ::after

  // Устанавливаем значения в CSS переменные
  document
    .querySelector(".authors")
    .style.setProperty(
      "--before-transform",
      `translateY(${scrollPosition * 0.01}px) translateX(${scrollPosition * 0.02}px) rotate(${rotateBefore}deg)`,
    );
  document
    .querySelector(".authors")
    .style.setProperty(
      "--after-transform",
      `translateY(${scrollPosition * -0.01}px) translateX(${-scrollPosition * 0.02}px) rotate(${rotateAfter}deg)`,
    );
});

document.addEventListener("DOMContentLoaded", function () {
  const containers = [
    { selector: ".course__tags-container_blue", direction: "scroll-right" },
    { selector: ".course__tags-container_green", direction: "scroll-left" },
  ];

  containers.forEach(({ selector, direction }) => {
    const tagsContainer = document.querySelector(selector);
    const totalWidth = tagsContainer.scrollWidth;
    console.log(totalWidth);

    // Устанавливаем анимацию для каждого контейнера с уникальной шириной и направлением
    if (selector === ".course__tags-container_green") {
      tagsContainer.style.animation = `${direction} ${(totalWidth / 60) * 2}s linear infinite`;
    } else if (selector === ".course__tags-container_blue") {
      tagsContainer.style.animation = `${direction} ${totalWidth / 60}s linear infinite`;
    }

    // Устанавливаем начальное смещение для `scroll-right`, чтобы избежать шва
    if (direction === "scroll-right") {
      tagsContainer.style.transform = `translateX(-100%)`;
    }

    // Устанавливаем ключевые кадры анимации для направления
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ${direction} {
        0% {
          transform: translateX(${direction === "scroll-right" ? "-100%" : "0"});
        }
        100% {
          transform: translateX(${direction === "scroll-right" ? "0" : -totalWidth / 2 + "px"});
        }
      }
    `;
    document.head.appendChild(style);
  });
});

const privacyText = document.querySelector(".form__privacy-text");
const privacyPopup = document.querySelector(".form__privacy-popup");
const closePopupButton = document.querySelector(".form__privacy-popup-close");

function openPrivacyPopup() {
  privacyPopup.classList.add("opened");
}

function closePrivacyPopup() {
  privacyPopup.classList.remove("opened");
}

privacyText.addEventListener("click", openPrivacyPopup);
closePopupButton.addEventListener("click", closePrivacyPopup);

// Закрытие попапа по клику вне области попапа
window.addEventListener("click", (event) => {
  if (
    privacyPopup.classList.contains("opened") &&
    !privacyPopup.contains(event.target) &&
    event.target !== privacyText
  ) {
    closePrivacyPopup();
  }
});

// Закрытие попапа по клавише Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePrivacyPopup();
  }
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const url =
    "https://script.google.com/macros/s/AKfycbwfQjLkkxRQgSUHNHikxqYjPP6IWxcuMqytcSdWCkhatVPW2k6LhDYJnYyCZXSjJg9y6w/exec";

  fetch(url, {
    method: "POST",
    body: new URLSearchParams({
      name: name,
      email: email,
    }),
  })
    .then((response) => {
      const btn = document.querySelector(".form__button");
      const textBtn = btn.querySelector(".form__text-wrapper");
      if (response.ok) {
        btn.style.backgroundColor = "#7f47c7";
        textBtn.textContent = "Submit another form?";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
      } else {
        btn.style.backgroundColor = "#ff5733";
        textBtn.textContent = "Oops, something went wrong";
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      const btn = document.querySelector(".form__button");
      const textBtn = btn.querySelector(".form__text-wrapper");
      textBtn.textContent = "Oops, something went wrong";
      btn.style.backgroundColor = "#ff5733";
    });
});
