document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cartModal');
    const billModal = document.getElementById('billModal');
    const paymentModal = document.getElementById('paymentModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const closeBillModal = document.getElementById('closeBillModal');
    const closePaymentModal = document.getElementById('closeModal');
    const cartItems = document.getElementById('cartItems');
    const billDetails = document.getElementById('billDetails');
    const viewCartButton = document.getElementById('viewCart');
    const generateBillButton = document.getElementById('generateBill');
    const payNowButton = document.getElementById('payNow');
    const applyDiscountButton = document.getElementById('applyDiscount');
    const discountCodeInput = document.getElementById('discountCode');
    const cashOnDeliveryButton = document.getElementById('cashOnDelivery');
    const gpayButton = document.getElementById('gpay');
    const phonepeButton = document.getElementById('phonepe');
    const paytmButton = document.getElementById('paytm');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = []; // Array to store cart items
    let discount = 0; // Discount percentage
    let discountApplied = false; // Track if discount has already been applied

    // Open and close modals
    function openModal(modal) {
        modal.style.display = 'flex';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    closeCartModal.addEventListener('click', () => closeModal(cartModal));
    closeBillModal.addEventListener('click', () => closeModal(billModal));
    closePaymentModal.addEventListener('click', () => closeModal(paymentModal));

    // Add to Cart
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default behavior

            const type = this.getAttribute('data-type');
            const price = parseFloat(this.getAttribute('data-price'));
            const quantity = 1; // Default quantity is 1 for now

            // Check if the item is already in the cart
            const existingItem = cart.find((item) => item.type === type);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.total += price * quantity;
            } else {
                cart.push({
                    type,
                    price,
                    quantity,
                    total: price * quantity,
                });
            }

            alert(`${type} added to cart!`);
        });
    });

    // View Cart
    viewCartButton.addEventListener('click', () => {
        cartItems.innerHTML = ''; // Clear previous cart items
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p>${item.quantity} x ${item.type} Eggs - ₹${item.total}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(itemDiv);
            });
        }
        openModal(cartModal);
    });

    // Remove from Cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        alert('Item removed from cart!');
        viewCartButton.click(); // Refresh the cart modal
    };

    // Generate Bill
    generateBillButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;

        billDetails.innerHTML = `
            <p>Subtotal: ₹${subtotal}</p>
            <p>Discount: ₹${discountAmount}</p>
            <p><strong>Total: ₹${total}</strong></p>
        `;
        openModal(billModal);
    });

    // Apply Discount
    applyDiscountButton.addEventListener('click', () => {
        const discountCode = discountCodeInput.value.trim();
        if (discountApplied) {
            alert('Discount has already been applied!');
            return;
        }

        if (discountCode === 'SAVE10') {
            discount = 0.1; // 10% discount
            discountApplied = true;
            alert('Discount applied successfully!');
        } else {
            alert('Invalid discount code!');
        }
    });

    // Show Payment Modal
    payNowButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        openModal(paymentModal);
    });

    // Payment Options
    cashOnDeliveryButton.addEventListener('click', () => {
        alert('Payment successful! Cash on delivery selected.');
        clearCart();
        window.location.href = 'orderpage.html';
    });

    gpayButton.addEventListener('click', () => {
        alert('Redirecting to GPay...');
        clearCart();
        window.location.href = 'orderpage.html';
    });

    phonepeButton.addEventListener('click', () => {
        alert('Redirecting to PhonePe...');
        clearCart();
        window.location.href = 'orderpage.html';
    });

    paytmButton.addEventListener('click', () => {
        alert('Redirecting to Paytm...');
        clearCart();
        window.location.href = 'orderpage.html';
    });

    // Clear Cart and Reset Fields
    function clearCart() {
        cart = [];
        discount = 0;
        discountApplied = false; // Reset discount for the next session
        cartItems.innerHTML = '';
        billDetails.innerHTML = '';
        closeModal(cartModal);
        closeModal(billModal);
        closeModal(paymentModal);
    }
});