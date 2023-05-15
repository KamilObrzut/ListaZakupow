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

// Sort func
const sortItems = () => {
  const sortArr = Array.from(userList.children);
  const newSortArrWithGroups = [];
  console.log(sortArr);
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
    const productName = btn.parentElement.textContent.trim();
    if (addedProducts[productName]) {
      addedProducts[productName]++;
      const item = Array.from(userList.children).find(
        (item) => item.dataset.productName === productName
      );
      item.firstChild.textContent = `${productName} x${addedProducts[productName]}`;
    } else {
      const newItemList = document.createElement("p");
      newItemList.dataset.productName = productName;
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
btnSort.addEventListener("click", sortItems);
