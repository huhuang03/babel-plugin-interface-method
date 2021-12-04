const babel = require('babel-core');
const plugin = require('../src');

// Can I have the ts visitor??
const interface1 = `
interface Foo {
    i: number;
}
`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

