const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { devConfig, PORT } = require('./config/webpack.config.dev');
const { spawn } = require('child_process');

const argv = require('minimist')(process.argv.slice(1));

const compiler = webpack(devConfig);
const server = new webpackDevServer(compiler, devConfig.devServer)
  .listen(PORT, 'localhost', function (err, result) {
  if (err) return console.error(err);

  console.log(`webpack-dev-server listening at http://localhost:${PORT}`);

  if (argv['electron']) {
    spawn('yarn', ['electron'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
  }
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  server.close(() => {
    process.exit(0);
  });
});