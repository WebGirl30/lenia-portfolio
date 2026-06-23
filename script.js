// LOGIN ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("roleSelect");

const welcomeText = document.getElementById("welcomeText");
const loginMessage = document.getElementById("loginMessage");

// LOGIN FUNCTION
loginBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value;

    // SIMPLE TEST LOGIN
    if (username !== "" && password !== "") {

        // HIDE LOGIN SCREEN
        loginScreen.classList.remove("active");

        // SHOW HOME SCREEN
        homeScreen.classList.add("active");

        // CHANGE WELCOME TEXT
        welcomeText.innerText =
            `Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)}`;

        loginMessage.innerText = "";

    } else {

        loginMessage.innerText =
            "Please enter a username and password.";

        loginMessage.style.color = "red";
    }
});

// LOGOUT
logoutBtn.addEventListener("click", () => {

    homeScreen.classList.remove("active");
    loginScreen.classList.add("active");

    usernameInput.value = "";
    passwordInput.value = "";
});

// TAB SWITCHING
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.remove("active"));

        tab.classList.add("active");

        const selectedTab = tab.dataset.tab;

        document.getElementById(selectedTab)
            .classList.add("active");
    });

});

// FOOD ITEMS
const foodItems = [
    {
        name: "Chicken Wrap",
        price: 6.50
    },
    {
        name: "Burger Combo",
        price: 7.99
    },
    {
        name: "Fruit Cup",
        price: 3.00
    },
    {
        name: "Iced Coffee",
        price: 2.50
    }
];

const foodGrid = document.getElementById("foodGrid");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");

let total = 0;

// DISPLAY FOOD
foodItems.forEach(item => {

    const card = document.createElement("div");

    card.classList.add("food-card");

    card.innerHTML = `
    <h4>${item.name}</h4>
    <p>$${item.price.toFixed(2)}</p>
    <button>Add</button>
  `;

    const button = card.querySelector("button");

    button.addEventListener("click", () => {

        const li = document.createElement("li");

        li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-btn">Remove</button>
    `;

        const removeBtn =
            li.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            cartList.removeChild(li);

            total -= item.price;

            cartTotal.innerText =
                `$${total.toFixed(2)}`;

        });

        cartList.appendChild(li);

        total += item.price;

        cartTotal.innerText =
            `$${total.toFixed(2)}`;

    });


    foodGrid.appendChild(card);
});

// CHECKOUT
const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutMessage =
    document.getElementById("checkoutMessage");

checkoutBtn.addEventListener("click", async () => {

    placeOrder();

    if (total > 0) {

        const response = await fetch("/checkout", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                orderId: currentOrder.orderId,

                total: total,

                status: currentOrder.status

            })

        });

        const result = await response.json();

        console.log(result);

        checkoutMessage.innerText =
            "Order placed successfully!";

        checkoutMessage.style.color = "green";

    } else {

        checkoutMessage.innerText =
            "Your cart is empty.";

        checkoutMessage.style.color = "red";
    }

});

let currentOrder = null;

function placeOrder() {

    currentOrder = {

        orderId: Math.floor(Math.random() * 100000),

        status: "received",

        timeRemaining: 15

    };

    updateOrderStatus();

    startOrderTimer();
}

function updateOrderStatus() {

    const container =
        document.getElementById("orderStatusContainer");

    let statusHTML = `
        <h3>Order #${currentOrder.orderId}</h3>
    `;

    if (currentOrder.timeRemaining > 10) {

        statusHTML += `
            <p>✓ Order Received</p>
            <p>Preparing Order...</p>
        `;

    }

    else if (currentOrder.timeRemaining > 5) {

        statusHTML += `
            <p>✓ Order Received</p>
            <p>✓ Preparing Order</p>
            <p>Cooking...</p>
        `;

    }

    else if (currentOrder.timeRemaining > 0) {

        statusHTML += `
            <p>✓ Order Received</p>
            <p>✓ Preparing Order</p>
            <p>✓ Almost Ready</p>
        `;

    }

    else {

        statusHTML += `
            <p>✓ Order Complete</p>
            <p>Ready For Pickup</p>
        `;
    }

    statusHTML += `
        <p>Estimated Time:
        ${currentOrder.timeRemaining} min</p>
    `;

    container.innerHTML = statusHTML;
}


function startOrderTimer() {

    const timer = setInterval(() => {

        currentOrder.timeRemaining--;

        updateOrderStatus();

        if (currentOrder.timeRemaining <= 0) {

            clearInterval(timer);

        }

    }, 5000);

}


// SUPPORT PAGE

const supportContent =
    document.getElementById("supportContent");

document.getElementById("callSupportBtn")
.addEventListener("click", () => {

    supportContent.style.display = "block";

    supportContent.innerHTML = `
        <h3>Contact Support</h3>
        <p><strong>Phone:</strong> (555) 123-4567</p>
        <p><strong>Email:</strong> support@campuseats.com</p>
        <p><strong>Hours:</strong> Monday - Friday, 8 AM - 8 PM</p>
    `;
});

document.getElementById("liveChatBtn")
.addEventListener("click", () => {

    supportContent.style.display = "block";

    supportContent.innerHTML = `
        <h3>Live Chat</h3>
        <p>Welcome to Campus Eats Support.</p>
        <p>How can we help you today?</p>

        <ul>
            <li>Order Issue</li>
            <li>Account Question</li>
            <li>Menu Information</li>
            <li>Technical Support</li>
        </ul>
    `;
});

document.getElementById("faqBtn")
.addEventListener("click", () => {

    supportContent.style.display = "block";

    supportContent.innerHTML = `
        <h3>Frequently Asked Questions</h3>

        <p><strong>How do I place an order?</strong></p>
        <p>Select menu items and proceed to checkout.</p>

        <p><strong>How do I check my order status?</strong></p>
        <p>Use the Order Status page to view updates.</p>

        <p><strong>How do I contact support?</strong></p>
        <p>Use the support options available in this section.</p>
    `;
});