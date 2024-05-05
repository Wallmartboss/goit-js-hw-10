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

button.disable = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    inputedDate = selectedDates[0].getTime();
    console.log(inputedDate);
    if (inputedDate < Date.now()) {
      iziToast.show({
        title: 'Warning!',
        message: 'Please choose a date in the future',
        position: `topCenter`,
    });
      button.disable = true;
      // button.style.cursor = "not-allowed"; 
      // button.style.backgroundColor =  "#cfcfcf";
      // button.style.color =  "#989898";
    }  else {
     userSelectedDate = selectedDates[0];
     button.disable = false;
    //  button.style.cursor = "pointer";
    //  button.style.backgroundColor =  "#4e75ff"; 
    //  button.style.color =  "#fff";
    }
    },
  };

flatpickr(selectedDate, options);
const startTimer = button.addEventListener("click", onClick);

function onClick ()  {
  timerTime = inputedDate - Date.now();
  const setUserTimerId = setInterval(fillingTimers(timerTime), 1000);
  
};

function fillingTimers(value) {
  // for (let i = value; i>0; i-=1000) { 
  convertMs(value);
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent =`${minutes}`;
  timerSeconds.textContent = `${seconds}`;
  // value -= 1000;
  // };
};

function addLeadingZero(value) {
    String(value).padStart(2,0);
 }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
   days =  addLeadingZero(Math.floor(ms / day));
   console.log(days);
  // Remaining hours
   hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
   minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
   seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

