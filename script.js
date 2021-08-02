function getItems () {
    db.collection("items").get().then((querySnapshot) => {

        let items = [];

        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                rating: doc.data().rating,
                price: doc.data().price,
            })
        });

        generateItems(items);

    });
}

function addToCart (item) {
    let cartItem = db.collection("cart-items").doc(item.id);

    cartItem.get()
        .then(function(doc) {
            if(doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity + 1,
                })
            } else {
                cartItem.set({
                    image: item.image,
                    make: item.make,
                    name: item.name,
                    rating: item.rating,
                    price: item.price,
                    quantity: 1,
                })
            }
        })
}

function generateItems(items) {

    items.forEach((item) => {

        let doc = document.createElement("div");
        doc.classList.add("main-product" , "mr-5");
        doc.innerHTML = `
                <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
                    <img class="w-full h-full object-contain" src="${item.image}" alt="Nintendo">
                </div>
                <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                    ${item.name}
                </div>
                <div class="product-make text-green-700 font-bold">
                    ${item.make}
                </div>
                <div class="product-rating text-yellow-500 my-1 font-bold">
                    ⭐⭐⭐⭐⭐ ${item.rating}
                </div>
                <div class="product-price font-bold text-lg text-gray-700">
                ${numeral(item.price).format('$0,0.00')}
                </div>
        `

        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("bg-yellow-400", "w-48", "px-2", "py-2", "hover:bg-yellow-500", "cursor-pointer", "flex", "items-center", "justify-center", "mt-2", "text-sm", "text-gray-600", "font-bold");
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener('click', (e) => {
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        document.querySelector('.main-section-products').appendChild(doc);

    })
}

getItems();