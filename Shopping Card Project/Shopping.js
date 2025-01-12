// Sample Data (can be dynamically fetched from an API or JSON file)
const products = [
    { id: 1, name: "Jeans", description: "Jeans are typically made from denim, a sturdy cotton twill fabric woven with indigo, gray, or mottled white yarn. 100% cotton denim is durable and will mold to your body with each wear.", price: 25, image: "Resources/images/jeans.jpg" },
    { id: 2, name: "Shirt", description: "A shirt is a piece of clothing worn on the upper body that usually has sleeves, a collar, and a front opening. Shirts can be made from a variety of materials, such as cotton or silk.", price: 30, image: "Resources/images/shirt.jpg" },
    { id: 3, name: "T-Shirt", description: "Traditionally, it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of stretchy, light, and inexpensive fabric and are easy to clean.", price: 45, image: "Resources/images/T-Shirt.jpg" }
];

// Cart array to store products added to cart
let cart = [];

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}" />
                <div class="info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        productList.innerHTML += productHTML;
    });
}

// Function to add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (!product) {
        alert("This product is unavailable.");
        return;
    }

    if (cartItem) {
        cartItem.quantity ++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        total += item.product.price * item.quantity;
        cartItemsDiv.innerHTML += `
            <div>
                <span>${item.product.name} - $${item.product.price} x ${item.quantity}</span>
                <button onclick="updateQuantity(${item.product.id}, 1)">+</button>
                <button onclick="updateQuantity(${item.product.id}, -1)">-</button>
            </div>
        `;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Function to update the quantity of an item in the cart
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.product.id === productId);
    
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.product.id !== productId);
        }
    }

    updateCart();
}

// Function to clear the cart
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Render products when page loads
window.onload = renderProducts;

function applyPromoCode(promoCode) {
    let discount = 0;
    
    if (promoCode === 'ostad10') {
        discount = 0.10;  // 10% discount
    } else if (promoCode === 'ostad5') {
        discount = 0.05;  // 5% discount
    } else {
        showError("Invalid promo code!");
        return;
    }

    // Calculate the discount and final total
    const subtotal = getSubtotal();  // This should be the sum of all item prices in the cart
    const discountAmount = subtotal * discount;
    const finalTotal = subtotal - discountAmount;

    // Display the results
    displayDiscount(discountAmount, finalTotal, subtotal);
}

function displayDiscount(discountAmount, finalTotal, subtotal) {
    document.getElementById("discount-amount").textContent = `Discount: $${discountAmount.toFixed(2)}`;
    document.getElementById("final-total").textContent = `Final Total: $${finalTotal.toFixed(2)}`;
    document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

function validatePromoCode(code) {
    const validCodes = ['ostad10', 'ostad5'];
    if (validCodes.includes(code)) {
        return true;
    }
    return false;
}

function applyPromoCode(promoCode) {
    if (!validatePromoCode(promoCode)) {
        showError("Invalid promo code!");
        return;
    }

    // If valid, proceed with the discount
    let discount = promoCode === 'ostad10' ? 0.10 : 0.05;
    const subtotal = getSubtotal();
    const discountAmount = subtotal * discount;
    const finalTotal = subtotal - discountAmount;

    displayDiscount(discountAmount, finalTotal, subtotal);
}

let promoApplied = false;

function applyPromoCode(promoCode) {
    if (promoApplied) {
        showError("Promo code has already been used.");
        return;
    }
    
    if (!validatePromoCode(promoCode)) {
        showError("Invalid promo code!");
        return;
    }

    promoApplied = true;  // Mark promo code as used
    // Continue with the discount application
}

function updateCart() {
    const subtotal = getSubtotal();  // Recalculate the subtotal based on updated cart
    const discountAmount = getDiscountAmount(subtotal);
    const finalTotal = subtotal - discountAmount;

    displayDiscount(discountAmount, finalTotal, subtotal);
}

function showError(message) {
    const errorElement = document.getElementById("promo-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

