// Get references to DOM elements
const checkoutButton = document.getElementById('checkout-btn');
const cartItemsDiv = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutMessageElement = document.getElementById('checkout-message');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCart() {
    // Clear the current cart display
    cartItemsDiv.innerHTML = '';
    let total = 0;

    // Loop through cart items and display them
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <p>${item.name} (₹${item.price}) x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    // Update the total price display
    totalPriceElement.textContent = `Total: ₹${total.toFixed(2)}`;

    // Enable checkout button if there are items in the cart
    checkoutButton.disabled = cart.length === 0;

    // Update the checkout message based on cart total
    if (total > 0) {
        checkoutMessageElement.textContent = `Ready to checkout with ₹${total.toFixed(2)}.`;
    } else {
        checkoutMessageElement.textContent = '';
    }
}

// Function to handle adding a dessert to the cart
function addToCart(dessert) {
    const existingDessert = cart.find(item => item.id === dessert.id);
    if (existingDessert) {
        existingDessert.quantity++;
    } else {
        cart.push({ ...dessert, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(dessertId) {
    cart = cart.filter(item => item.id !== dessertId);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Function to handle the checkout process
checkoutButton.addEventListener('click', () => {
    cart = []; // Clear the cart after checkout
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
    updateCart(); // Update the cart display

    // Show a toast message indicating the order has been placed
    showOrderPlacedMessage();
});

// Function to show a toast message when the order is placed
function showOrderPlacedMessage() {
    const orderMessage = document.createElement('div');
    orderMessage.classList.add('order-placed-message');
    orderMessage.textContent = 'Your order has been placed successfully!';
    document.body.appendChild(orderMessage);

    // Make the message visible, then hide it after a few seconds
    setTimeout(() => orderMessage.classList.add('show'), 10);
    setTimeout(() => orderMessage.classList.remove('show'), 3000);
}

// Example function to add a dessert to the cart (you can link this with buttons in the dessert items)
function createDessert(id, name, price, imageSrc) {
    return { id, name, price, imageSrc };
}

// Example dessert data to add to the cart
const chocolateDessert = createDessert(1, 'Chocolate Cake', 350, 'chocolate-cake.jpg');
const cakeDessert = createDessert(2, 'Vanilla Cake', 450, 'vanilla-cake.jpg');
const sweetDessert = createDessert(3, 'Gulab Jamun', 100, 'gulab-jamun.jpg');

// Example: Automatically adding some desserts to the cart for testing
addToCart(chocolateDessert);
addToCart(cakeDessert);
addToCart(sweetDessert);
