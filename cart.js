function getCartItems () {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        });
        generateCartItems(cartItems);
    })
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get()
        .then( function (doc) {
            if(doc.exists) {
                if (doc.data().quantity > 1) {
                    cartItem.update({
                        quantity: doc.data().quantity - 1,
                    })
                }
            }
        })
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-item flex items-center pb-4 border-b">
            <div class="cart-item-image w-40 h-24 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain" src="${item.image}" alt="product-image">
            </div>
            <div class="cart-item-details flex-grow">
                <div class="cart-item-title font-bold text-sm text-gray-600">${item.name}</div>
                <div class="cart-item-brand text-gray-400 text-sm">
                    ${item.make}
                </div>
            </div>
            <div class="cart-item-counter w-48 flex items-center">
                <div data-id="${item.id}" class="cart-item-decrease left-chevron cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <h4 class="text-gray-400">x${item.quantity}</h4>
                <div data-id="${item.id}" class="cart-item-increase left-chevron cursor-pointer text-gray-400 bg-gray-100 rounded h-6 w-6 flex items-center justify-center hover:bg-gray-200 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            <div class="cart-item-total-cost w-48 font-bold text-gray-400">$${item.price * item.quantity}</div>
            <div class="cart-item-delete w-10 font-bold text-gray-400 cursor-pointer hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
    </div>
        `
    })

    document.querySelector('.cart-items').innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll('.cart-item-decrease');
    let increaseButtons = document.querySelectorAll('.cart-item-increase');
    
    decreaseButtons.forEach((button) => {
        button.addEventListener('click', function() {
            decreaseCount(button.dataset.id);
        });
    });
}

getCartItems();