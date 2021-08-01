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

function generateItems(items) {

    let itemsHTML = "";

    items.forEach((item) => {

        itemsHTML += `
        <div class="main-product mr-6 cursor-pointer">
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
            $${item.price}
        </div>
        <div class="add-to-cart-button bg-yellow-400 w-48 px-2 py-2 hover:bg-yellow-500 cursor-pointer flex items-center justify-center mt-2 text-sm text-gray-600 font-bold">
            Add to cart
        </div>
    </div>
        `
    })

    document.querySelector('.main-section-products').innerHTML = itemsHTML;
}

getItems();