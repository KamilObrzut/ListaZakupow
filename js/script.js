const productInput = document.querySelector(".search");
const products = document.querySelectorAll("li");
const btnAddProduct = document.querySelectorAll(".btn-add-product");
const userList = document.querySelector(".user-list");
const btnCopyClipboard = document.querySelector(".copy-clipboard");
const btnSort = document.querySelector(".sort-items");
const btnClear = document.querySelector(".clear");
const btnCloseModal = document.querySelector(".btn-close-modal");
const btnCloseCopyModal = document.querySelector(".btn-close-copy-modal");
const modalBlur = document.querySelector(".modal-blur");
const modalStart = document.querySelector(".modal-start");
const modalCopy = document.querySelector(".modal-copy");

let addedProducts = {};

// Sort Items func
const sortItems = () => {
  const vegFrutArr = [];
  const dairyArr = [];
  const chemicalsArr = [];
  const nutsArr = [];
  const drinksArr = [];
  const oilAndSpicesArr = [];

  let items = Array.from(userList.children);
  for (let item of items) {
    const productClass = item.dataset.productClass;
    if (productClass === "frut-veg") {
      vegFrutArr.push(item);
    } else if (productClass === "dairy") {
      dairyArr.push(item);
    } else if (productClass === "chem") {
      chemicalsArr.push(item);
    } else if (productClass === "nuts") {
      nutsArr.push(item);
    } else if (productClass === "drinks") {
      drinksArr.push(item);
    } else if (productClass === "oil-and-spices") {
      oilAndSpicesArr.push(item);
    }
  }

  userList.innerHTML = "";

  if (vegFrutArr.length === 0) {
  } else {
    let vegFrutTitle = document.createElement("h4");
    vegFrutTitle.innerText = "OWOCE & WARZYWA:";
    userList.appendChild(vegFrutTitle);
  }
  for (let item of vegFrutArr) {
    userList.appendChild(item);
  }

  if (dairyArr.length === 0) {
  } else {
    let dairyTitle = document.createElement("h4");
    dairyTitle.innerText = "NABIAŁ:";
    userList.appendChild(dairyTitle);
  }
  for (let item of dairyArr) {
    userList.appendChild(item);
  }

  if (chemicalsArr.length === 0) {
  } else {
    let chemicalsTitle = document.createElement("h4");
    chemicalsTitle.innerText = "CHEMIA GOSPODARCZA:";
    userList.appendChild(chemicalsTitle);
  }
  for (let item of chemicalsArr) {
    userList.appendChild(item);
  }

  if (nutsArr.length === 0) {
  } else {
    let nutsTitle = document.createElement("h4");
    nutsTitle.innerText = "ORZECHY:";
    userList.appendChild(nutsTitle);
  }
  for (let item of nutsArr) {
    userList.appendChild(item);
  }

  if (drinksArr.length === 0) {
  } else {
    let drinksTitle = document.createElement("h4");
    drinksTitle.innerText = "NAPOJE & ALKOHOL:";
    userList.appendChild(drinksTitle);
  }
  for (let item of drinksArr) {
    userList.appendChild(item);
  }

  if (oilAndSpicesArr.length === 0) {
  } else {
    let oilAndSpicesTitle = document.createElement("h4");
    oilAndSpicesTitle.innerText = "PRZYPRAWY & OLEJE:";
    userList.appendChild(oilAndSpicesTitle);
  }
  for (let item of oilAndSpicesArr) {
    userList.appendChild(item);
  }
};

// Clear products list function
const clearList = () => {
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild);
  }
  addedProducts = {};
};

// Copy list to clipboard function
const copyToClipboard = () => {
  const arr = Array.from(userList.children);
  const copiedItems = [];
  arr.forEach((item) => {
    const slicedItem = item.textContent.slice(0, -1);
    copiedItems.push(slicedItem);
  });
  const copyText = copiedItems.join("\n");
  navigator.clipboard.writeText(copyText).then(() => {
    modalStart.classList.add("modal-hidden");
    modalBlur.classList.add("modal-blur");
    modalBlur.classList.remove("modal-hidden");
    modalCopy.classList.add("modal-copy");
    modalCopy.classList.remove("modal-hidden");
  });
};

// Close modals function
const closeModal = () => {
  modalBlur.classList.add("modal-hidden");
};

// Add/Remove elements from Users list function
for (let btn of btnAddProduct) {
  btn.addEventListener("click", () => {
    const productItem = btn.parentElement;
    const productName = productItem.textContent.trim();
    const productClass = productItem.className;

    if (addedProducts[productName]) {
      addedProducts[productName]++;
      const item = Array.from(userList.children).find(
        (item) => item.dataset.productName === productName
      );
      item.firstChild.textContent = `${productName} x${addedProducts[productName]}`;
    } else {
      const newItemList = document.createElement("p");
      newItemList.dataset.productName = productName;
      newItemList.dataset.productClass = productClass;
      addedProducts[productName] = 1;
      newItemList.innerText = productName;
      userList.appendChild(newItemList);

      const newRemoveBtn = document.createElement("button");
      newRemoveBtn.innerText = "x";
      newItemList.appendChild(newRemoveBtn);

      newRemoveBtn.addEventListener("click", () => {
        addedProducts[productName]--;
        if (addedProducts[productName] === 0) {
          delete addedProducts[productName];
          newRemoveBtn.parentElement.remove();
        } else {
          const item = Array.from(userList.children).find(
            (item) => item.dataset.productName === productName
          );
          item.firstChild.textContent = `${productName} x${addedProducts[productName]}`;
        }
      });
    }

    sortItems();
  });
}

// Search function
const filterProducts = () => {
  products.forEach((item) => {
    const match = new RegExp(productInput.value, "i").test(item.textContent);
    if (!match) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
};

productInput.addEventListener("keyup", filterProducts);
btnCopyClipboard.addEventListener("click", copyToClipboard);
btnClear.addEventListener("click", clearList);
btnCloseModal.addEventListener("click", closeModal);
btnCloseCopyModal.addEventListener("click", closeModal);
