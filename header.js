function getCartItems () {
    //onSnapshot is a web socket
    db.collection("cart-items").onSnapshot((snapshot) => {
            let totalCount = 0;
            snapshot.forEach((doc) => {
                totalCount += doc.data().quantity;
            });
            setCartCounter(totalCount);
        })
}

function setCartCounter (totalCount) {
    // order-count
    document.querySelector('.order-count').innerText = totalCount;
}

getCartItems();