const { app, BrowserWindow, Menu, shell } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow = null;
const dev = process.env.NODE_ENV === 'development';

const installExtensions = () => {
  if (dev) {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
  }

  return Promise.resolve([]);
};

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  const html = dev ? 
   `http:\\localhost:${process.env.PORT}`
   : url.format({
    pathname: path.join(__dirname, "./index.html"),
    protocol: "file:",
    slashes: true,
  });
  mainWindow.loadURL(html);
  
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('close', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => 
  installExtensions()
  .then(() => {
    createWindow();
  }));

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
