async function fetchData() {
  try {
      const response = await fetch(
          "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448",
      );

      if (!response.ok) {
          throw new Error("Failed to fetch product data");
      }
      
      const data = await response.json();
      displayProductData(data.product);
      const errorDisplayElement = document.querySelector('.ErrorDisplay');
      errorDisplayElement.style.display = 'block';
  } catch (error) {
      console.error("There was a problem fetching product data:", error);
  }
}

function displayProductData(product) {
  const productNameElement = document.getElementById("product-name");
  const productImgElement = document.getElementById("img");
  const descriptionElement = document.getElementById("Description");

  assignOptions(product.options);

  productNameElement.textContent = `${product.title}`;
  document.getElementById("Product-Vendor").textContent = `${product.vendor}`;
  descriptionElement.innerHTML = product.description;

  document.getElementById("Price").textContent = "$19999.00";
  document.getElementById("Compare-Price").textContent = `$12999.00`;
  document.getElementById("Percentage-Off").textContent = `35%`;
}

const assignOptions = (options = []) => {
  const [colors, sizes] = [...options];
  const colorSelector = document.getElementById("ColorSelector");
  const sizeSelector = document.getElementById("SizeSelector");

  for (let i = 0; i < colors.values.length; i++) {
      const color = colors.values[i];
      const colorBox = document.createElement("div");

      if (i === 0) {
          colorBox.className = "colorOptions active";
      } else {
          colorBox.className = "colorOptions";
      }
      colorBox.id = `${Object.values(color)[0]}`;
      colorBox.style.backgroundColor = `${Object.values(color)[0]}`;
      colorBox.style.outlineColor = `${Object.values(color)[0]}`;

      colorSelector.append(colorBox);
  }

  for (let option of sizes.values) {
      const radioContainer = document.createElement("div");
      const radioButton = document.createElement("input");

      radioContainer.className = "radio-container";
      radioContainer.id = `${option}`;
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("name", "sizes");
      radioButton.setAttribute("value", option);
      radioButton.setAttribute("id", option);

      const label = document.createElement("label");
      label.setAttribute("for", option);
      label.textContent = option;

      radioContainer.appendChild(radioButton);
      radioContainer.appendChild(label);

      sizeSelector.appendChild(radioContainer);
  }

  const radioButtons = document.querySelectorAll(".radio-container");
  for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].addEventListener("click", () => {
          for (let j = 0; j < radioButtons.length; j++) {
              radioButtons[j].classList.remove("active");
          }
          const radio = radioButtons[i].querySelector('input[type="radio"]');
          radio.click();
          radioButtons[i].classList.add("active");
      });
  }

  const colorsContainers = document.querySelectorAll(".colorOptions");
  for (let color of colorsContainers) {
      color.addEventListener("click", () => {
          for (let i = 0; i < colorsContainers.length; i++) {
              colorsContainers[i].classList.remove("active");
          }
          color.classList.add("active");
      });
  }
};

const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");
const quantityValue = document.getElementById("quantity");
let defaultValue = 1;

quantityValue.innerText = defaultValue;

incrementButton.addEventListener("click", () => {
  defaultValue++;
  quantityValue.innerText = defaultValue;
});

decrementButton.addEventListener("click", () => {
  if (defaultValue === 0) {
      decrementButton.disabled = true;
  } else {
      defaultValue--;
      quantityValue.innerText = defaultValue;
  }
});

function errorDisplay() {
  // Functionality for error display
}

fetchData();
