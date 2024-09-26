const products = [
  { title: "Orange Wide Leg", price: "980,00€", img: "./Images/1.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["White", "Black"], borders: ["", "black"] } },
  { title: "Tailored Jacket", price: "980,00€", img: "./Images/2.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["Blue", "Black"], borders: ["blue", "black"] } },
  { title: "Accordion Pleated Dress", price: "980,00€", img: "./Images/3.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["Red", "Grey"], borders: ["#B20F36", "#AFAFB7"] } },
  { title: "Green Trench Coat", price: "980,00€", img: "./Images/4.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["White", "Black"], borders: ["", "black"] } },
  { title: "Tennis Blue T-Shirt", price: "980,00€", img: "./Images/5.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["Grey", "Black"], borders: ["#AFAFB7", "black"] } },
  { title: "Long Sleeve Tennis Top", price: "980,00€", img: "./Images/6.png", description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.", colors: { text: ["Blue", "Black"], borders: ["blue", "black"] } },
];

const variants = {
  1: { color: { White: { XS: "40120892948609", S: "40120893014145", M: "40120893079681", L: "40120893145217", XL: "40123938930817" }, Black: { XS: "40120892915841", S: "40120892981377", M: "40120893046913", L: "40120893112449", XL: "40123938963585" } } },
  2: { color: { Blue: { XS: "40120890294401", S: "40120890359937", M: "40120890425473", L: "40120890491009", XL: "40123939225729" }, Black: { XS: "40120890261633", S: "40120890327169", M: "40120890392705", L: "40120890458241", XL: "40123939258497" } } },
  3: { color: { Red: { XS: "40120891867265", S: "40120891932801", M: "40120891998337", L: "40120892063873", XL: "40123941552257" }, Grey: { XS: "40120891834497", S: "40120891900033", M: "40120891965569", L: "40120892031105", XL: "40123941585025" } } },
  4: { color: { White: { XS: "40120894029953", S: "40120894095489", M: "40120894161025", L: "40120894226561", XL: "40123942961281" }, Black: { XS: "40120893997185", S: "40120894062721", M: "40120894128257", L: "40120894193793", XL: "40123942994049" } } },
  5: { color: { Grey: { XS: "40120895111297", S: "40120895176833", M: "40120895242369", L: "40120895307905", XL: "40123945615489" }, Black: { XS: "40120895078529", S: "40120895144065", M: "40120895209601", L: "40120895275137", XL: "40123945648257" } } },
  6: { color: { Blue: { XS: "40120893767809", S: "40120893833345", M: "40120893898881", L: "40120893964417", XL: "40123946270849" }, Black: { XS: "40120893735041", S: "40120893800577", M: "40120893866113", L: "40120893931649", XL: "40123946303617" } } },
};

let currentProductId; // Global variable to store the current product ID
let smallModalOpen = false; // Track if small modal is open

const openModal = (productId) => {
  currentProductId = productId; // Set the current product ID here
  const product = products[productId - 1];

  // Set the normal modal content
  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-price").innerText = product.price;
  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-description").innerText = product.description;

  // Check screen width to decide whether to show the normal modal
  const screenWidth = window.innerWidth;
  if (screenWidth < 3840) {
    document.getElementById("modal").style.display = "flex";
  }

  // Create or show the small modal for the product
  createSmallModal(productId, product);

  // Update button text and border colors
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn, index) => {
    btn.innerText = product.colors.text[index];
    btn.style.borderLeftColor = product.colors.borders[index];

    // Apply special class for 1st and 4th modals
    btn.classList.remove("special");
    if (productId === 1 || productId === 4) {
      btn.classList.add("special");
    }
  });
};

const createSmallModal = (productId, product) => {
  const smallModalsContainer = document.getElementById("small-modals-container");

  // Create small modal element if it doesn't exist
  let smallModal = document.querySelector(`.small-modal-${productId}`);

  if (!smallModal) {
    smallModal = document.createElement("div");
    smallModal.classList.add("small-modal", `small-modal-${productId}`);
    smallModal.innerHTML = `
      <div class="small-modal-content">
        <div class="small-modal-body">
          <div class="small-modal-image">
            <img id="small-modal-img-${productId}" src="${product.img}" alt="Small Modal Image" />
          </div>
          <div class="small-modal-info">
            <div class="small-modal-title" id="small-modal-title-${productId}">
              ${product.title}
            </div>
            <div class="small-modal-price" id="small-modal-price-${productId}">
              ${product.price}
            </div>
          </div>
        </div>
      </div>
    `;
    smallModalsContainer.appendChild(smallModal);
  }

  // Position the small modal below the clicked plus button
  const plusButton = document.querySelector(`.plus-button-${productId}`);
  const rect = plusButton.getBoundingClientRect();
  smallModal.style.top = `${rect.bottom}px`;
  smallModal.style.left = `${rect.left}px`;

  // Show the small modal
  smallModal.style.display = "block";
  smallModalOpen = true;

  // Check if the screen width is 4K resolution
  const screenWidth = window.innerWidth;
  if (screenWidth >= 3840) {
    plusButton.innerText = "✖";
    plusButton.classList.add("cross-sign");
  } else {
    plusButton.innerText = "+";
    plusButton.classList.remove("cross-sign");
  }

  // Close the small modal and reset the plus button
  const closeSmallModal = () => {
    smallModal.style.display = "none";
    plusButton.innerText = "+";
    plusButton.classList.remove("cross-sign");
    smallModalOpen = false;
  };

  // Remove any existing event listener before adding a new one
  plusButton.removeEventListener("click", plusButtonClickHandler);

  // Create a handler function to avoid duplicating the event listener
  function plusButtonClickHandler(event) {
    event.stopPropagation();
    if (smallModalOpen) {
      closeSmallModal();
    } else {
      createSmallModal(productId, product);
    }
  }

  // Attach the event handler to the plus button
  plusButton.addEventListener("click", plusButtonClickHandler);

  // Open the corresponding normal modal when clicking on the small modal
  smallModal.onclick = (event) => {
    event.stopPropagation();
    openNormalModal(productId);
  };
};

const openNormalModal = (productId) => {
  const product = products[productId - 1];

  // Set the normal modal content for the specific product
  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-price").innerText = product.price;
  document.getElementById("modal-img").src = product.img;
  document.getElementById("modal-description").innerText = product.description;

  // Show the normal modal
  document.getElementById("modal").style.display = "flex";
};

function closeModal() {
  document.getElementById("modal").style.display = "none";
  smallModalOpen = false;
}

let isFirstClick = true; // Flag to track the first click

function handleClick(element) {
  const activeBackground = document.getElementById("activeBackground");
  const parent = element.parentNode;
  const buttons = parent.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  element.classList.add("active");

  const index = Array.from(buttons).indexOf(element);

  if (isFirstClick) {
    activeBackground.style.transition = "opacity 400ms ease";
    activeBackground.style.transform = `translateX(${index * 104}%)`;
    activeBackground.style.visibility = "visible";
    activeBackground.style.opacity = "1";
    isFirstClick = false;
  } else {
    activeBackground.style.transition =
      "transform 400ms ease, opacity 400ms ease";
    activeBackground.style.transform = `translateX(${index * 103}%)`;
  }
}

const customSelect = document.querySelector(".custom-select");
const selected = customSelect.querySelector(".selected");
const optionsContainer = customSelect.querySelector(".options");
const optionsList = customSelect.querySelectorAll(".option");

selected.addEventListener("click", () => {
  customSelect.classList.toggle("open");
});

optionsList.forEach((option) => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
    customSelect.classList.remove("open");
    optionSelected = true;
  });
});

let dropdownOpen = false;

function toggleDropdown() {
  const dropdown = document.querySelector(".custom-select");
  const options = dropdown.querySelector(".options");

  dropdownOpen = !dropdownOpen;

  if (dropdownOpen) {
    dropdown.querySelector(".selected").textContent = "Choose your size";
  }

  if (dropdownOpen) {
    dropdown.classList.add("open");
  } else {
    dropdown.classList.remove("open");
  }
}

// Shopify Cart Functionality

function addToCart() {
  const activeColorBtn = document.querySelector(".btn.active");
  const selectedColor = activeColorBtn ? activeColorBtn.innerText : null;
  const selectedSize = document.querySelector(".custom-select .selected")
    ? document.querySelector(".custom-select .selected").innerText
    : null;

  if (!selectedColor || selectedSize === "Choose your size") {
    alert("Please select a color and size before adding to cart.");
    return;
  }

  const variantId =
    variants[currentProductId]?.color[selectedColor]?.[selectedSize];

  if (!variantId) {
    alert("Selected combination not available.");
    return;
  }

  const data = {
    items: [
      {
        id: variantId,
        quantity: 1,
      },
    ],
  };

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Item added to cart!");
      closeModal();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
