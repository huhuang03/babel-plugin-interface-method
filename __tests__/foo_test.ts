import { parse } from '@babel/parser';
import {traverse, transform} from '@babel/core';
import generate from '@babel/generator';

it('should just run some code', function () {
  const code = 'const n = 1';

  const ast = parse(code);

  traverse(ast, {
    enter(path) {
      console.log(path);
      if (path.isIdentifier({name: 'n'})) {
        path.node.name = 'x';
      }
    }
  })

  const output = generate(ast, {}, code);
  console.log(output.code);
});

it('use a plugin?', () => {
  const code = 'const n = 1';

  // const ast = parse(code);

  // traverse(ast, {
  //   enter(path) {
  //     console.log(path);
  //     if (path.isIdentifier({name: 'n'})) {
  //       path.node.name = 'x';
  //     }
  //   }
  // })

  const output = transform(code, {
    plugins: [
      function myFirstPlugin() {
        return {
          visitor: {
            Identifier(path) {
              if (path.isIdentifier({name: 'n'})) {
                path.node.name = 'x';
              }
            }
          }
        }
      }
    ]
  })
  console.log(output.code);
})
