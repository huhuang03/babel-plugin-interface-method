const babel = require('babel-core');
const plugin = require('../src');

// Can I have the ts visitor??
const example = `
interface Good {
    id: string;
}
`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});

