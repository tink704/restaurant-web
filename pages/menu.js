// Data specific to the Menu Page
const menuData = [
    { id: 101, category: 'food', name: "Avocado Smashed Toast", price: 8.50, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500", quantity: 0 },
    { id: 102, category: 'food', name: "Classic Blueberry Croissant", price: 4.50, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500", quantity: 0 },
    { id: 103, category: 'food', name: "Smoked Salmon Bagel", price: 9.00, img: "../images/fish.jpg", quantity: 0 }, // Updated image path for fishimages/fish.jpg", quantity: 0 },
    { id: 104, category: 'drink', name: "Velvet Latte", price: 3.50, img: "../images/latte.jpg", quantity: 0 },
    { id: 105, category: 'drink', name: "Midnight Espresso", price: 2.00, img: "../images/espresso.jpg", quantity: 0 },
    { id: 106, category: 'drink', name: "Biscoff Cookie Shake", price: 5.50, img: "../images/cappuccino.jpg", quantity: 0 }
];

// Set Food as the default
let currentCategory = 'food';

function initMenu() {
    renderMenuItems();
    setupTabListeners();
}

function renderMenuItems() {
    const grid = document.getElementById('product-list');
    const filtered = menuData.filter(item => item.category === currentCategory);

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" style="animation: fadeIn 0.6s ease forwards;">
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>$${p.price.toFixed(2)}</p>
            <div class="qty-controls">
                <button onclick="updateQty(${p.id}, -1)" class="qty-btn"><i class="fas fa-minus"></i></button>
                <span id="qty-${p.id}">${p.quantity}</span>
                <button onclick="updateQty(${p.id}, 1)" class="qty-btn"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    `).join('');
}

function setupTabListeners() {
    const drinkBtn = document.getElementById('btn-drink');
    const foodBtn = document.getElementById('btn-food');

    drinkBtn.addEventListener('click', () => switchTab('drink'));
    foodBtn.addEventListener('click', () => switchTab('food'));
}

function switchTab(category) {
    currentCategory = category;
    
    // UI Update for Buttons
    document.getElementById('btn-drink').classList.toggle('active', category === 'drink');
    document.getElementById('btn-food').classList.toggle('active', category === 'food');

    renderMenuItems();
}

function updateQty(id, delta) {
    const item = menuData.find(p => p.id === id);
    if (item) {
        item.quantity = Math.max(0, item.quantity + delta);
        document.getElementById(`qty-${id}`).innerText = item.quantity;
        calculateCart();
    }
}

function calculateCart() {
    const totalItems = menuData.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = menuData.reduce((sum, p) => sum + (p.quantity * p.price), 0);

    document.getElementById('item-count').innerText = totalItems;
    document.getElementById('item-count-badge').innerText = totalItems;
    document.getElementById('total-bill').innerText = totalPrice.toFixed(2);

    const cartBar = document.getElementById('cart-summary-bar');
    totalItems > 0 ? cartBar.classList.add('visible') : cartBar.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', initMenu);