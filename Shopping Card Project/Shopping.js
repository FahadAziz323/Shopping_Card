<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Mall</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>
    <nav>
        <h1>FBAA Clothing</h1>
    </nav>
    <div id="product-list" class="product-list"></div>

    <div id="cart-section">
        <h2>Product Cart</h2>
        <div id="cart-items"></div>
        <button id="clear-cart">Clear Cart</button>
        <p>Total: $<span id="total-price">0</span></p>
        <button id="checkout">Checkout</button>
    </div>

    <script src="./Shopping.js"></script>
</body>
</html>
