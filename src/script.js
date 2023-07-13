total = document.querySelector("#total");

//get total
function getTotal() {
  if (f1.price.value != "") {
    const t = +f1.price.value + +f1.taxes.value - +f1.discount.value;
    total.innerHTML = "total : " + t;
    total.classList.remove("bg-red-800");
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "total : ";
    total.style.backgroundColor = "red";
  }
}
getTotal();

//create product
//save localstorage
//clear inputs
//count

let produits;
if (localStorage.getItem("produits")) {
  produits = JSON.parse(localStorage.getItem("produits"));
} else {
  produits = [];
}

function saveProduit() {
  const form = document.forms.f1;
  const title = form.elements.title.value;
  const category = form.elements.category.value;

  if (!title || !category) {
    alert("Please complete the form.");
    return;
  }

  const countValue = form.elements.count.value || 1;

  for (let index = 0; index < countValue; index++) {
    const newProduit = {
      title,
      price: form.elements.price.value,
      taxes: form.elements.taxes.value,
      discount: form.elements.discount.value,
      total: document.getElementById("total").innerHTML,
      count: countValue,
      category,
    };

    produits.push(newProduit);
  }

  localStorage.setItem("produits", JSON.stringify(produits));
  affichage();
}

//read
function affichage() {
  let table = "";

  for (let index = 0; index < produits.length; index++) {
    table += `
      <tr >
        <td class="px-6 py-4 text-xl">${index}</td>
        <td class="px-6 py-4 text-xl">${produits[index].title}</td>
        <td class="px-6 py-4 text-xl">${produits[index].price}</td>
        <td class="px-6 py-4 text-xl">${produits[index].discount}</td>
        <td class="px-6 py-4 text-xl">${produits[index].total}</td>
        <td class="px-6 py-4 text-xl">${produits[index].category}</td>
        <td 
        class="px-6 py-4 text-xl">
        <button 
        onclick="Update(${index})"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ">
        Update
        </button></td>
        <td class="px-6 py-4 text-xl"><button 
        onclick="Delete(${index})"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ">
        delete
      </button></td>
      </tr>
    `;
  }

  document.querySelector("#tb").innerHTML = table;
}
affichage();

//delete
function Delete(index) {
  produits.splice(index, 1);
  localStorage.setItem("produits", JSON.stringify(produits));
  affichage();
}

//delete all
function deleteAllbtn() {
  const parentElement = document.getElementById("deleteAll");
  const deleteAllButton = document.createElement("button");
  deleteAllButton.id = "deleteAll";
  deleteAllButton.textContent = "Delete All(" + produits.length + ")";
  deleteAllButton.className =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg";
  deleteAllButton.onclick = deleteAll;
  if (produits.length != 0) {
    parentElement.appendChild(deleteAllButton);
  } else {
    deleteAllButton.parentNode.removeChild(deleteAllButton);
  }
}

deleteAllbtn();
function deleteAll() {
  produits = [];
  localStorage.setItem("produits", JSON.stringify(produits));
  affichage();
}

//update
function Update(i) {
  let form = document.forms.f1;
  form.title.value = produits[i].title;
  form.price.value = produits[i].price;
  form.taxes.value = produits[i].taxes;
  form.discount.value = produits[i].discount;
  form.category.value = produits[i].category;
  form.count.style.display = "none";
  document.querySelector("#create").style.display = "none";
  document.querySelector("#update").style.display = "block";

  function updateAll() {
    produits[i].title = form.title.value;
    produits[i].price = form.price.value;
    produits[i].taxes = form.taxes.value;
    produits[i].discount = form.discount.value;
    localStorage.setItem("produits", JSON.stringify(produits));
    form.count.style.display = "block";
    document.querySelector("#create").style.display = "block";
    document.querySelector("#update").style.display = "none";
  }

  document.querySelector("#update").onclick = updateAll;
}

//search
let searchMode = "title";

function searchTitle() {
  searchMode = "title";
}

function searchCategory() {
  searchMode = "category";
}

function search() {
  let searchValue = f1.searching.value.toLowerCase();
  let filteredProduits = [];

  if (searchMode === "title") {
    filteredProduits = produits.filter((produit) =>
      produit.title.toLowerCase().includes(searchValue)
    );
  } else {
    filteredProduits = produits.filter((produit) =>
      produit.category.toLowerCase().includes(searchValue)
    );
  }

  let table = "";

  for (let index = 0; index < filteredProduits.length; index++) {
    table += `
      <tr>
        <td class="px-6 py-4 text-xl">${index}</td>
        <td class="px-6 py-4 text-xl">${filteredProduits[index].title}</td>
        <td class="px-6 py-4 text-xl">${filteredProduits[index].price}</td>
        <td class="px-6 py-4 text-xl">${filteredProduits[index].discount}</td>
        <td class="px-6 py-4 text-xl">${filteredProduits[index].total}</td>
        <td class="px-6 py-4 text-xl">${filteredProduits[index].category}</td>
        <td class="px-6 py-4 text-xl">
          <button onclick="Update(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Update
          </button>
        </td>
        <td class="px-6 py-4 text-xl">
          <button onclick="Delete(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Delete
          </button>
        </td>
      </tr>
    `;
  }

  document.querySelector("#tb").innerHTML = table;
}



//clean data
