const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    title: 'RecenTweets',

    width: 500,
    height: 800,
    center: true,
    minWidth: 500,
    minHeight: 800,
    maxWidth: 500,
    maxHeight: 800,

    icon: path.join(__dirname, '/images/tray.ico'),

    fullscreenable: false,
    maximizable: false,
    autoHideMenuBar: true,
    enableLargerThanScreen: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });
  
  // Main window loads index.html file
  loginWindow.loadFile(path.join(__dirname, 'login.html'));

  loginWindow.on('minimize', function() { 
    loginWindow.minimize();
  });

  loginWindow.show();
}
  
// Function to create child window of parent one
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'RecenTweets',

    width: 1200,
    height: 800,
    center: true,
    minWidth: 1000,
    minHeight: 600,
    show: false,

    icon: path.join(__dirname, '/images/tray.ico'),

    fullscreenable: false,
    autoHideMenuBar: true,
    enableLargerThanScreen: false,
    parent: loginWindow, // !important
  
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  
  // Child window loads index.html file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  mainWindow.on('minimize', function() { 
    mainWindow.minimize();
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    loginWindow.hide();
  });
}

// Handles window switching
ipcMain.on("openMainWindow", (event, arg) => {
  createMainWindow();
});

ipcMain.on("openLoginWindow", (event, arg) => {
  app.relaunch();
  app.exit();
});

// Default app behaviour
app.whenReady().then(() => {
  createLoginWindow();
  
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoginWindow();
    }
  });
});
  
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});