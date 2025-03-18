// index.js

document.addEventListener("DOMContentLoaded", main);

// Callbacks
const handleClick = (ramen) => {
  document.querySelector("#ramen-detail .name").textContent = ramen.name;
    document.querySelector("#ramen-detail .restaurant").textContent = ramen.restaurant;
    const detailImg = document.querySelector("#ramen-detail img");
    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    document.getElementById("rating-display").textContent = ramen.rating;
    document.getElementById("comment-display").textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", event => {
      event.preventDefault();

      const newRamen = {
          name: event.target.name.value,
          restaurant: event.target.restaurant.value,
          image: event.target.image.value,
          rating: event.target.rating.value,
          comment: event.target.comment.value
      };

      const img = document.createElement("img");
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.addEventListener("click", () => handleClick(newRamen));

      document.getElementById("ramen-menu").appendChild(img);
      form.reset();
  });
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens") // Replace with your API URL
        .then(response => response.json())
        .then(ramens => {
            const ramenMenu = document.getElementById("ramen-menu");
            ramens.forEach(ramen => {
                const img = document.createElement("img");
                img.src = ramen.image;
                img.alt = ramen.name;
                img.addEventListener("click", () => handleClick(ramen));
                ramenMenu.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching ramen data:", error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
}

main()

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
