const plugin = function ({types: t}) {
    return {
        visitor: {
          Identifier(path) {
            if (path.node.name === 'foo') {
              path.node.name = 'bar';
            }
          }
        }
    }
}

module.exports = plugin;
