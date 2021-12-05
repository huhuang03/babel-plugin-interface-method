"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@babel/parser");
const core_1 = require("@babel/core");
const generator_1 = __importDefault(require("@babel/generator"));
it('should just run some code', function () {
    const code = 'const n = 1';
    const ast = (0, parser_1.parse)(code);
    (0, core_1.traverse)(ast, {
        enter(path) {
            console.log(path);
            if (path.isIdentifier({ name: 'n' })) {
                path.node.name = 'x';
            }
        }
    });
    const output = (0, generator_1.default)(ast, {}, code);
    console.log(output.code);
});
it('use a plugin?', () => {
    const code = 'const n = 1';
    const output = (0, core_1.transform)(code, {
        plugins: [
            function myFirstPlugin() {
                return {
                    visitor: {
                        Identifier(path) {
                            if (path.isIdentifier({ name: 'n' })) {
                                path.node.name = 'x';
                            }
                        }
                    }
                };
            }
        ]
    });
    console.log(output.code);
});
function MyPlugin() {
    const rst = {
        visitor: {
            Identifier: path => {
                console.log('identifier');
            },
            StringLiteral: path => {
                console.log('string literal');
            }
        }
    };
    return rst;
    return {
        visitor: {
            Identifier(path) {
                if (path.isIdentifier({ name: 'n' })) {
                    path.node.name = 'x';
                }
            }
        }
    };
}
it("boring plugin", () => {
    const code = String.raw `
  function greet(name) {
  return 'Hello ' + name;
}
console.log(greet('tanhauhau')); // Hello tanhauhau
  `;
    const output = (0, core_1.transform)(code, {
        plugins: [
            MyPlugin,
            // function myPlugin() {
            //
            // }
        ]
    });
    console.log(output.code);
});
it('haha', function () {
});
