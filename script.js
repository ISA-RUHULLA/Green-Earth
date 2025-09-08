let plants = [];
let cart = [];

// All categories load data
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(response => response.json())
        .then(data => displayCategories(data.categories));
};

const displayCategories = (treeCategories) => {
    const container = document.getElementById("app-categorys");
    container.innerHTML = '';

    const allBtn = document.createElement("button");
    allBtn.innerText = "All Trees";
    allBtn.classList.add("category-btn", "px-3", "py-1", "rounded", "mb-1", "bg-green-600", "text-white");
    allBtn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("bg-green-600", "text-white");
            btn.classList.add("bg-transparent", "text-black");
        });

        allBtn.classList.add("bg-green-600", "text-white");
        allBtn.classList.remove("bg-transparent", "text-black");

        filterPlants("All Trees");
    });
    container.appendChild(allBtn);

    // Dynamic categories loop
    treeCategories.forEach(category => {
        const categoryDiv = document.createElement("button");
        categoryDiv.classList.add("category-btn", "px-3", "py-1", "rounded", "mb-1", "bg-transparent", "text-black", "hover:bg-green-200");
        categoryDiv.innerText = category.category_name;

        categoryDiv.addEventListener("click", () => {

            document.querySelectorAll(".category-btn").forEach(btn => {
                btn.classList.remove("bg-green-600", "text-white");
                btn.classList.add("bg-transparent", "text-black");
            });

            categoryDiv.classList.add("bg-green-600", "text-white");
            categoryDiv.classList.remove("bg-transparent", "text-black");

            filterPlants(category.category_name);
        });

        container.appendChild(categoryDiv);
    });
};

// loading Spinner 
function showSpinner() {
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById("app-plants").classList.add("hidden");
}

function hideSpinner() {
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("app-plants").classList.remove("hidden");
}

// Filter plants by category
function filterPlants(categoryName) {
    showSpinner();
       setTimeout(() => {
    if (categoryName === "All Trees") {
            displayPlants(plants);     
    } else {
        const filteredPlants = plants.filter(plant => plant.category === categoryName);
        displayPlants(filteredPlants);
    }
    hideSpinner();
        }, 500);
}

// Display Plants
const plantItem = () => {
     showSpinner();
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => {
            plants = data.plants;
            displayPlants(plants);
            hideSpinner();
        });
};

const displayPlants = (plants) => {
    const container = document.getElementById("app-plants");
    container.innerHTML = '';

    plants.forEach(plant => {
        const plantDiv = document.createElement("div");
        plantDiv.classList.add("plant-item");
        plantDiv.innerHTML = `
            <div class="flex flex-col gap-1 p-2 ml-2 lg:w-[210px] bg-white rounded-lg">
                <img src="${plant.image}" class="h-[180px] rounded" alt="">
                <h2 onclick="modalData('${plant.id}')" class="font-bold text-left cursor-pointer ">${plant.name}</h2>
                <p class="text-[13px] line-clamp-2">${plant.description}</p>
                <div class="flex flex-row justify-between items-center">
                    <a href="#" class="px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803D]">${plant.category}</a>
                    <span>$${plant.price}</span>
                </div>
                <button 
                    class="add-to-cart px-3 py-1 rounded-full text-white bg-[#15803D] cursor-pointer hover:bg-green-700"
                    data-name="${plant.name}" 
                    data-price="${plant.price}">
                    Add to Cart
                </button>
            </div>
        `;
        container.appendChild(plantDiv);
    });
};

// Set Modal
const modalData = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        displayModalData(data.plants)
    });
};

const displayModalData = (plant) => {
    console.log(plant)
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.innerHTML =`
            <div class="flex flex-col gap-1 p-2 ml-2 lg:w-[400px] bg-white rounded-lg">
                <img src="${plant.image}" class="h-[180px] rounded" alt="">
                <h2 class="font-bold text-left ">${plant.name}</h2>
                <p class="text-[13px]">${plant.description}</p>
                <div class="flex flex-row justify-between items-center">
                    <a href="#" class="px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803D]">${plant.category}</a>
                    <span>$${plant.price}</span>
                </div>
            </div>
    `;
    document.getElementById('my_modal_5').showModal();
}

// Cart functions
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);

        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "items-center", "mb-2");
        div.innerHTML = `
            <span><span class="font-bold">${item.name}</span> <br>
            ৳${item.price}</span>
            <button class="delete-btn bg-green-500 text-white px-2 py-1 rounded" data-index="${index}">X</button>
        `;
        cartList.appendChild(div);
    });

    cartTotal.textContent = total;
}

// Event delegation for Add & Delete
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const name = e.target.getAttribute("data-name");
        const price = e.target.getAttribute("data-price");
        addToCart(name, price);
    }

    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1); // remove item from cart
        renderCart();
    }
});

plantItem();
loadData();
