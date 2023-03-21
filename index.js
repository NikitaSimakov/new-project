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
  return fetch("https://cataas.com/cat?json=true")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch((error) => {
      console.log(error);
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
  const markup = `<img src='https://cataas.com/cat/${data._id}'></img>`;
  container.insertAdjacentHTML("beforeend", markup);
}
