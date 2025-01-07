'use strict';

// Функция для добавления событий на элементы
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// Прелоадер
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Навбар
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () { 
  navbar.classList.toggle("active"); 
}

navToggler.addEventListener("click", toggleNavbar);

// Хедер активен при скролле
const header = document.querySelector("[data-header]");

const activeHeader = function () {
  window.scrollY > 50 ? header.classList.add("active")
    : header.classList.remove("active");
}

window.addEventListener("scroll", activeHeader);

// Таймер обратного отсчета
const eventDate = new Date("2025-02-22T16:00:00").getTime(); // Дата мероприятия
const countdownElement = document.getElementById("countdown"); // Элемент для таймера

const timer = setInterval(() => {
  const now = new Date().getTime(); // Текущее время
  const distance = eventDate - now; // Разница во времени

  // Расчет дней, часов, минут и секунд
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Отображение таймера
  countdownElement.innerHTML = `${days} дн. ${hours} ч. ${minutes} мин. ${seconds} сек.`;

  // Действие при завершении таймера
  if (distance < 0) {
    clearInterval(timer);
    countdownElement.innerHTML = "Мероприятие уже началось!";
  }
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-link");

  window.addEventListener("scroll", () => {
    let current = "";

    // Определяем текущую видимую секцию
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    // Обновляем активную ссылку в навбаре
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
