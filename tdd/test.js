var shop = require('./index');

test('Cost Calculation', () => {
    expect( shop.cost(2) ).toBe(196);
});
