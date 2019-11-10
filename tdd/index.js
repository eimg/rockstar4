var price = 98;

function cost(qty) {
    show();
    return price * qty;
}

function show() {
    price = 99;
    console.log(`
        Original price $${price}.
        Discount price $${price - 1}.
    `);
}

module.exports = {
    cost
}
