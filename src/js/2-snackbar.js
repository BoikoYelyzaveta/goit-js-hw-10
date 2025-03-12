import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Проміс виконано через ${delay} мс`);
      } else {
        reject(`❌ Проміс відхилено через ${delay} мс`);
      }
    }, delay);
  });

  promise
    .then((message) => {
      iziToast.success({
        title: "Успіх",
        message: message,
        position: "topRight",
        timeout: 5000,
      });
    })
    .catch((message) => {
      iziToast.error({
        title: "Помилка",
        message: message,
        position: "topRight",
        timeout: 5000,
      });
    });
});
