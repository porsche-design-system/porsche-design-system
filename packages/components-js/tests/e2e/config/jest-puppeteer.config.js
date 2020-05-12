module.exports = {
  server: {
    command: 'node node_modules/.bin/stencil build --watch --serve --no-open',
    port: 3333
  },
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
  }
};
