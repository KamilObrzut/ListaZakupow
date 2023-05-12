const productInput = document.querySelector(".search");
const products = document.querySelectorAll("li");
const btnAddProduct = document.querySelectorAll(".btn-add-product");
const userList = document.querySelector(".user-list");
const btnAddProductSingle = document.querySelector(".btn-add-product");
const btnCopyClipboard = document.querySelector(".copy-clipboard");
const btnClear = document.querySelector(".clear");

let addedProducts = {};

// Clear products list
const clearList = () => {
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild);
  }
  addedProducts = {};
};

// Copy list to clipboard
const copyToClipboard = () => {
  const arr = Array.from(userList.children);
  const copiedItems = [];
  arr.forEach((item) => {
    const slicedItem = item.textContent.slice(0, -1);
    copiedItems.push(slicedItem);
  });

  const copyText = copiedItems.join("\n");
  navigator.clipboard.writeText(copyText).then(() => {
    alert("Skopiowano do schowka");
    // Temporary alert - In future will be Modal
  });
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

// Search
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
