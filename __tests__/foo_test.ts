import * as babel from '@babel/core';
import { parse } from '@babel/parser';
import {traverse, transform, Visitor} from '@babel/core';
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

  const output = transform(code, {
    plugins: [
      function myFirstPlugin() {
        return {
          visitor: {
            Identifier(path: any) {
              if (path.isIdentifier({name: 'n'})) {
                path.node.name = 'x';
              }
            }
          }
        }
      }
    ]
  })
  console.log(output?.code);
})

interface Rst {
  visitor: Visitor
}

function MyPlugin() {
  return {
    visitor: {
      StringLiteral(path: any) {
        const concat = path.node.value
          .split('')
          .map((c: any) => babel.types.stringLiteral(c))
          .reduce((prev: any, curr: any) => {
            return babel.types.binaryExpression('+', prev, curr);
          });
        path.replaceWith(concat);
        path.skip();
      },

      Identifier(path: any) {
        if (
          !(
            path.parentPath.isMemberExpression() &&
            path.parentPath
              .get('object')
              .isIdentifier({ name: 'console' }) &&
            path.parentPath.get('property').isIdentifier({ name: 'log' })
          )
        ) {
          path.node.name = path.node.name
            .split('')
            .reverse()
            .join('');
        }
      }
    }

  }
}


it("boring plugin", () => {
  const code = String.raw`
  function greet(name) {
  return 'Hello ' + name;
}
console.log(greet('tanhauhau')); // Hello tanhauhau
  `;

  const output = transform(code, {
    plugins: [
      MyPlugin,
      ]})
  console.log(output?.code);
})
