const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.body;  // Doğrudan body'yi seçiyoruz
const quantity = document.querySelector(".quantity");  // 'quantity' olarak düzeltildi

let products = [
    { id: 1, name: "PRODUCT 1", images:"11.png", price: 2000 },
    { id: 2, name: "PRODUCT 2", images:"12.png", price: 2200 },
    { id: 3, name: "PRODUCT 3", images:"13.png", price: 2400 },
    { id: 4, name: "PRODUCT 4", images:"14.png", price: 2600 },
    { id: 5, name: "PRODUCT 5", images:"15.png", price: 1900 },
    { id: 6, name: "PRODUCT 6", images:"16.png", price: 1750 }
];

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="${value.images}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    });
};

initApp();

const addToCard = (key) => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }else {
        // Ürün zaten varsa miktarını artır
        listCards[key].quantity += 1;
    }
    reloadCard();
};

const reloadCard = () => {
    listCard.innerHTML = "";
    let totalPrice = 0;  // Toplam fiyat
    let count = 0;  // Toplam ürün sayısı

    listCards.forEach((value) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;  // Ürün fiyatı * miktar
            count += value.quantity;  // Toplam ürün sayısını hesapla

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="${value.images}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}</div> <!-- Ürün başına toplam fiyat -->
                <div>
                    <button class="cardButton" onclick="changeQuantity(${value.id - 1}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button class="cardButton" onclick="changeQuantity(${value.id - 1}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();  // Toplam fiyatı güncelle
    quantity.innerText = count;  // Toplam ürün sayısını güncelle
};



const changeQuantity = (key, quantity) => {
    if (quantity <= 0) {
        delete listCards[key];  // Ürün miktarı sıfırsa sil
    } else {
        listCards[key].quantity = quantity;  // Miktarı güncelle
    }
    reloadCard();  // Sepeti yeniden yükle
};


// Sepeti açıp kapatma
openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

