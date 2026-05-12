const cardContainer = document.getElementById("card-container");

const tabs = document.querySelectorAll(".tab");

let currentCategory = "prints";

async function loadCategory(category) {
  try {
    const response = await fetch(`./data/${category}.json`);

    const products = await response.json();

    renderCards(products);
  } catch (error) {
    console.error("Failed loading category:", error);
  }
}

function renderCards(products) {
  cardContainer.innerHTML = "";

  products.forEach((product) => {
    const card = createCard(product);

    cardContainer.appendChild(card);
  });
}

function createCard(product) {
  const card = document.createElement("a");

  card.className = "card";

  card.href = product.etsyLink;

  card.target = "_blank";

  card.innerHTML = `
    <div class="image-wrapper">
      <img
        src="${product.image}"
        alt="${product.title}"
      />
    </div>

    <div class="card-content">

      <h2>${product.title}</h2>

      <p>${product.description}</p>s

    </div>
  `;

  return card;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    currentCategory = tab.dataset.file;

    loadCategory(currentCategory);
  });
});

loadCategory(currentCategory);
