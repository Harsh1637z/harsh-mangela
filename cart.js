function displayCart() {
    let cartList = document.getElementById("cart-list");
    let totalPrice = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Rs.${item.price}</p>
            </div>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
        `;

        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (newQuantity > 0) {
        cart[index].quantity = parseInt(newQuantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

function checkout() {
    alert("Redirecting to payment gateway...");
    localStorage.removeItem("cart"); // Clears cart after checkout
    displayCart();
}

// Display cart when page loads
document.addEventListener("DOMContentLoaded", displayCart);

function goToCheckout() {
    window.location.href = "checkout.html"; // Redirects to checkout page
}