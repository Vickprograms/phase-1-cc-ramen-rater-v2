document.addEventListener("DOMContentLoaded", main);

const handleClick = (ramen,) => {
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  const detailImg = document.querySelector(".detail-image");
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
          name: document.getElementById("new-name").value,
          restaurant: document.getElementById("new-restaurant").value,
          image: document.getElementById("new-image").value,
          rating: document.getElementById("new-rating").value,
          comment: document.getElementById("new-comment").value
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
};

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
