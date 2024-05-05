import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("form");
const value = "Success";

form.addEventListener("submit", onClick);

function onClick(event) {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    makePromise(delay, state)
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    });
    form.reset();
};

const makePromise = (delay, state) => {
    return new Promise((resolve, reject) => {
         setTimeout(() => {
                  if(state == "fulfilled") {
                      resolve(iziToast.success({
                        title: 'OK',
                        message: `Fulfilled promise in ${delay}ms`,
                        position: 'topRight',
                        }))
                  } else {
                      reject(
                        iziToast.error({
                        title: 'Error',
                        message: `Rejected promise in ${delay}ms`,
                        position: 'topRight',
                       }))
                  }
              }, delay);
    });
  };
  