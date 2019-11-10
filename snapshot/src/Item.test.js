import React from 'react';
import Item from './Item.js';
import renderer from 'react-test-renderer';

test('Item Component', () => {
    const tree = renderer.create(
        <Item name="Apple" price="2.99" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
