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
