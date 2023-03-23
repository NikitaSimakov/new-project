const container = document.querySelector(".js-beer_container");
const BASE_URL = "https://api.punkapi.com/v2/beers";
const button = document.querySelector(".moreBtn");
const guard = document.querySelector(".js_guard");
let page = 1;
const options = {
  root: null,
  rootMargin: "600px",
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);
// button.addEventListener("click", onClick);

renderMarkup();
function renderMarkup() {
  return beerApi()
    .then((data) => {
      createMarkup(data);
      observer.observe(guard);
    })
    .catch((error) => console.log(error));
}

function onLoad(entries, observer) {
  // console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      page += 1;
      beerApi(page).then((data) => {
        createMarkup(data);
        if (data[data.length - 1].id === 325) {
          console.log(data[data.length - 1].id);
          observer.unobserve(guard);
        }
      });
    }
  });
}

// function onClick() {
//   page += 1;
//   beerApi(page).then(createMarkup);
// }

function beerApi(page = 1) {
  return fetch(`${BASE_URL}?page=${page}&per_page=80`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch((error) => console.log(error));
}

function createMarkup(data) {
  const markup = data.map(
    (item) =>
      `<li class='item'>
      <div class='img_container'> 
      <img class='beer_img' src='${item.image_url}'>
      </div>
      <div class='card_container'>
    <h1>${item.name}</h1>
    
    <p>${item.description}</p>
    <span>IBU: ${item.ibu}</span>|<span>ABV: ${item.abv}</span>|<span>EBC: ${
        item.ebc
      }</span>
    <h3>Brewers tips: ${item.brewers_tips}</h2>
    <h3>Food pairing: ${item.food_pairing.join(", ")}</h2>
    <div>
      </li>
    `
  );
  container.insertAdjacentHTML("beforeend", markup.join(" "));
}
