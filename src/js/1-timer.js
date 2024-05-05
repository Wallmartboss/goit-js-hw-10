import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let inputedDate;
let timerTime;
let days;
let hours;
let minutes;
let seconds;

const selectedDate = document.querySelector("#datetime-picker");
const button = document.querySelector("button[data-start]");
const timerDays = document.querySelector(".value[data-days]");
const timerHours = document.querySelector(".value[data-hours]");
const timerMinutes = document.querySelector(".value[data-minutes]");
const timerSeconds = document.querySelector(".value[data-seconds]");

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputedDate = selectedDates[0].getTime();
        if (inputedDate < Date.now()) {
      iziToast.show({
        title: 'Error!',
        message: 'Please choose a date in the future',
        position: `topRight`,
        backgroundColor: 'red',
        titleColor: `#fff`,
        messageColor: `#fff`,
    });
      button.disabled = true;
       }  else {
     userSelectedDate = selectedDates[0];
     button.disabled = false;
       }
    },
  };

flatpickr(selectedDate, options);

const startTimer = button.addEventListener("click", onClick);

function onClick ()  {
    const setUserTimerId = setInterval(() => {
    timerTime = inputedDate - Date.now();
    if (timerTime <= 0) {
      clearInterval(setUserTimerId);
      selectedDate.disabled = false;
      button.disabled = false;
      return
    } else {
      const { days, hours, minutes, seconds } = convertMs(timerTime);
      fillingTimers({days, hours, minutes, seconds});
      selectedDate.disabled = true;
      button.disabled = true;
    };
    }, 1000);
}

function fillingTimers({days, hours, minutes, seconds}) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent =`${minutes}`;
  timerSeconds.textContent = `${seconds}`;
};

function addLeadingZero(value) {
   return String(value).padStart(2,0);
 }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
   days =  addLeadingZero(Math.floor(ms / day));
     // Remaining hours
   hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
   minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
   seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}