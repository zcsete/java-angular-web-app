const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

require('electron-debug')({ enabled: true});
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 640,
    height: 480,
	webPreferences: {
	nodeIntegration: false   }
  });
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("browser-window-created", function(e, window) {
  window.setMenu(null);
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
