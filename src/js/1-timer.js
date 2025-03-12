import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

refs.startBtn.disabled = true; // Кнопка неактивна при старті

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      updateTimerUI(0, 0, 0, 0);
      refs.input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
