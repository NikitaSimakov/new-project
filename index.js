import { Notify } from "notiflix/build/notiflix-notify-aio";

const container = document.querySelector(".js-container");

container.addEventListener("click", onClick);

fetchingCat();

function onClick(event) {
  fetchCat().then((data) => {
    container.innerHTML = "";
    createMarkup(data);
  });
}

function fetchCat() {
  return fetch("https://aws.random.cat/meow")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch((error) => {
      Notify.failure(error);
      return error;
    });
}

function fetchingCat() {
  fetchCat().then((data) => {
    console.log(data);
    createMarkup(data);
  });
}

function createMarkup(data) {
  const markup = `<img src='${data.file}'></img>`;
  container.insertAdjacentHTML("beforeend", markup);
}
