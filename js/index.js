var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productSearch = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var row = document.getElementById("row");

var productContainer;

if (localStorage.getItem("productList") != null) {
  productContainer = JSON.parse(localStorage.getItem("productList"));
  displayProducts();
} else {
  productContainer = [];
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
    image: `images/${productImage.files[0]?.name}`,
  };
  productContainer.push(product);
  localStorage.setItem("productList", JSON.stringify(productContainer));
  console.log(productContainer);
  clearForm();
  displayProducts();
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProducts() {
  var cartoona = ``;
  for (var i = 0; i < productContainer.length; i++) {
    cartoona +=
      `<div class="col-lg-3">
    <div class="card">
    <img src="${productContainer[i].image}" class="card.img-top w-100" alt="">
    <div class="card-body">
    <h3 class="text-center">` +
      productContainer[i].name +
      `</h3>
    <p class="text-secondary">` +
      productContainer[i].desc +
      `</p>
    <h3 class="h5">Category : <span>` +
      productContainer[i].category +
      `</span></h3>
    <h3 class="h5">Price : <span>` +
      productContainer[i].price +
      `</span></h3>

      <button onclick="deleteProduct(${i})" class"btn btn-outline-danger btn-sm w-100 my-2 ">Delete <i class="fas fa-trash-alt"></i></button>
      <button onclick="setFormForUpdate(${i})" class"btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
    
    </div>
    </div>
    </div>`;
  }
  row.innerHTML = cartoona;
}

function deleteProduct(deletedIndex) {
  productContainer.splice(deletedIndex, 1);
  displayProducts();
  localStorage.setItem("productList", JSON.stringify(productContainer));
  console.log(productContainer);
}

function searchProducts() {
  var term = productSearch.value;

  var cartoona = ``;

  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartoona +=
        `<div class="col-lg-3">
    <div class="card">
    <img src="${productContainer[i].image}" class="card.img-top w-100" alt="">
    <div class="card-body">
    <h3 class="text-center">` +
        productContainer[i].name +
        `</h3>
    <p class="text-secondary">` +
        productContainer[i].desc +
        `</p>
    <h3 class="h5">Category : <span>` +
        productContainer[i].category +
        `</span></h3>
    <h3 class="h5">Price : <span>` +
        productContainer[i].price +
        `</span></h3>

      <button onclick="deleteProduct(${i})" class"btn btn-outline-danger btn-sm w-100 my-2 ">Delete <i class="fas fa-trash-alt"></i></button>
      <button onclick="setFormForUpdate(${i})" class"btn btn-outline-warning btn-sm w-100 my-2">Update <i class="fas fa-pen"></i></button>
    
    </div>
    </div>
    </div>`;
    }
  }
  row.innerHTML = cartoona;
}

var updateIndex;

function setFormForUpdate(z) {
  updateIndex = z;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productName.value = productContainer[z].name;
  productDesc.value = productContainer[z].desc;
  productCategory.value = productContainer[z].category;
  productPrice.value = productContainer[z].price;
}

function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productContainer[updateIndex].name = productName.value;
  productContainer[updateIndex].desc = productDesc.value;
  productContainer[updateIndex].category = productCategory.value;
  productContainer[updateIndex].price = productPrice.value;
  displayProducts();
  localStorage.setItem("productList", JSON.stringify(productContainer));
}

function validateInputs(element) {
  console.log(element.id);
  var regex = {
    productName: /^[A-Z][a-z]{2,8}$/,
    productPrice: /^[1-9][0-9][0-9]/,
    productCategory: /^(Mobile|TV|Tab|Watches)$/,
    productDesc: /^.{6}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
