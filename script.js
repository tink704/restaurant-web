const products1 = [
    { id: 1, name: "Velvet Latte / ላቴ", price: 3.50, img: "images/latte.jpg", quantity: 0 },
    { id: 2, name: "Pure Espresso / ኤስፕሬሶ", price: 2.00, img: "images/espresso.jpg", quantity: 0 },
    { id: 3, name: "Silk Cappuccino / ካፑቺኖ", price: 3.00, img: "images/cappuccino.jpg", quantity: 0 },
    { id: 4, name: "Biscoff Shake", price: 5.50, img: "images/biscoff-shake.jpg", quantity: 0 }
];

function init() {
    renderMenu();
    updateUI();
}

function renderMenu() {
    const grid = document.getElementById('product-list');
    if (!grid) return; // Prevents errors if the element isn't on the page

    grid.innerHTML = products1.map(p => `
        <div class="product-card" style="animation: fadeIn 0.8s ease forwards;">
            <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/500x500?text=Coffee'">
            <h4>${p.name}</h4>
            <p>$${p.price.toFixed(2)}</p>
            <div class="qty-controls">
                <button onclick="changeQty(${p.id}, -1)" class="qty-btn" aria-label="Decrease quantity">
                    <i class="fas fa-minus"></i>
                </button>
                <span id="qty-${p.id}" class="qty-number">${p.quantity}</span>
                <button onclick="changeQty(${p.id}, 1)" class="qty-btn" aria-label="Increase quantity">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function changeQty(id, delta) {
    const product = products1.find(p => p.id === id);
    if (product) {
        product.quantity = Math.max(0, product.quantity + delta);
        
        // Update the specific number on the card
        const qtyElement = document.getElementById(`qty-${id}`);
        if (qtyElement) qtyElement.innerText = product.quantity;
        
        updateUI();
    }
}

function updateUI() {
    const totalItems = products1.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = products1.reduce((sum, p) => sum + (p.quantity * p.price), 0);

    // Update the Nav Badge and the Floating Cart Bar
    const badge = document.getElementById('item-count-badge');
    const itemCount = document.getElementById('item-count');
    const totalBill = document.getElementById('total-bill');
    const cartBar = document.getElementById('cart-summary-bar');

    if (badge) badge.innerText = totalItems;
    if (itemCount) itemCount.innerText = totalItems;
    if (totalBill) totalBill.innerText = totalPrice.toFixed(2);

    // Show/Hide the floating cart bar
    if (cartBar) {
        if (totalItems > 0) {
            cartBar.classList.add('visible');
        } else {
            cartBar.classList.remove('visible');
        }
    }
}

// Checkout Logic
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const total = document.getElementById('total-bill').innerText;
        alert(`☕ Your damr order is confirmed!\nTotal: $${total}\n\nThank you for choosing artisanal coffee!`);
    });
}

document.addEventListener('DOMContentLoaded', init);