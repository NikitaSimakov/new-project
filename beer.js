const container = document.querySelector(".js-container");
console.log(container);

function fetchBeer() {
  return fetch("https://api.punkapi.com/v2/beers?page=2&per_page=20")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch((error) => console.log(error));
}
fetchBeer().then(createMarkup);

function createMarkup(data) {
  const markup = data.map(
    (item) =>
      `
    <h1>${item.name}</h1>
    <img class='beer_img' src='${item.image_url}'>
    <p>${item.description}</p>
    <span>IBU: ${item.ibu}</span>|<span>ABV: ${item.abv}</span>|<span>EBC: ${
        item.ebc
      }</span>
    <h2>Brewers tips: ${item.brewers_tips}</h2>
    <h2>Food pairing: ${item.food_pairing.join(", ")}</h2>
    `
  );
  container.insertAdjacentHTML("beforeend", markup.join(" "));
}
