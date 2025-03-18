// Function to fetch and display all ramen images in #ramen-menu
const displayRamens = () => {
  fetch("http://localhost:3000/ramens") // Fetch ramen data from server
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById("ramen-menu");

      // Loop through each ramen and display it as an image
      ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;

        // Add event listener to display ramen details when clicked
        img.addEventListener("click", () => handleClick(ramen));
        
        ramenMenu.appendChild(img);
      });
    })
    .catch(error => console.error("Error fetching ramen data:", error));
};

// Function to display ramen details when an image is clicked
const handleClick = (ramen) => {
  document.querySelector("#ramen-detail > .name").textContent = ramen.name;
  document.querySelector("#ramen-detail > .restaurant").textContent = ramen.restaurant;

  // Correcting selector for image (as expected by test)
  const detailImg = document.querySelector("#ramen-detail > .detail-img");
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;

  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
};

// Function to handle form submission and add a new ramen
const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  
  form.addEventListener("submit", event => {
    event.preventDefault();

    const newRamen = {
      name: event.target["new-name"].value,
      restaurant: event.target["new-restaurant"].value,
      image: event.target["new-img"].value,
      rating: event.target["new-rating"].value,
      comment: event.target["new-comment"].value
    };

    // Create new ramen image and add event listener
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));

    document.getElementById("ramen-menu").appendChild(img);

    // Reset form after submission
    form.reset();
  });
};

// Main function to initialize program logic after DOM has fully loaded
const main = () => {
  displayRamens();
  addSubmitListener();
};

// Ensure main runs after DOM is loaded
document.addEventListener("DOMContentLoaded", main);
