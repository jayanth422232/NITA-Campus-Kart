/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const buyBtn = document.getElementById("buyBtn");
    const sellBtn = document.getElementById("sellBtn");
    const buySection = document.getElementById("buySection");
    const sellSection = document.getElementById("sellSection");
    const itemsContainer = document.getElementById("itemsContainer");
    const sellForm = document.getElementById("sellForm");

    // Toggle between Buy and Sell sections
    buyBtn.addEventListener("click", () => {
        buySection.classList.add("active");
        sellSection.classList.add("hidden");
    });

    sellBtn.addEventListener("click", () => {
        buySection.classList.remove("active");
        sellSection.classList.remove("hidden");
    });

    // Load preloaded items
    const preloadedItems = [
        { name: "Workshop Kit", price: "200", description: "Complete kit for mechanical workshops." },
        { name: "Mess Coupon", price: "10", description: "Valid for one meal in the hostel mess." }
    ];

    function displayItems(items) {
        itemsContainer.innerHTML = "";
        items.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");
            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>${item.description}</p>
            `;
            itemsContainer.appendChild(itemCard);
        });
    }

    // Load stored items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("marketItems")) || [];
    displayItems([...preloadedItems, ...storedItems]);

    // Handle new item submission
    sellForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newItem = {
            name: document.getElementById("itemName").value,
            price: document.getElementById("itemPrice").value,
            description: document.getElementById("itemDescription").value
        };
        storedItems.push(newItem);
        localStorage.setItem("marketItems", JSON.stringify(storedItems));
        displayItems([...preloadedItems, ...storedItems]);
        sellForm.reset();
        alert("Item posted successfully!");
    });
});
