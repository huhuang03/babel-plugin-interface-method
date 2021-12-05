// interface Foo {
//   aa: number;
// }

const aa: {aa: number} = {
  aa: 2
}

// const plugin = function ({types: t}) {
//     return {
//         visitor: {
//           Program(path) {
//               console.log(path)
//           },
//           Identifier(path) {
//             if (path.node.name === 'foo') {
//               path.node.name = 'bar';
//             }
//           }
//         }
//     }
// }
//
// module.exports = plugin;
