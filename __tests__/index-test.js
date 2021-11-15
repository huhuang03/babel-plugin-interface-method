// const babel = require('babel-core');
// const plugin = require('../');

// const example = `
// var foo = 1;
// if (foo) console.log(foo);
// `;

// it('works', () => {
//   // const {code} = babel.transform(example, {plugins: [plugin]});
//   // expect(code).toMatchSnapshot();
// });
// ``

const sum = require('../src');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
