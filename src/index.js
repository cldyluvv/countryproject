// Import necessary modules
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
// Declare variables for windows
let mainWindow;
let addWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
// Create the main window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.webContents.openDevTools();
};
// Event listener for 'ready' event
app.on('ready', createWindow);
// Event listener for 'window-all-closed' event
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// Event listener for 'activate' event
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// Event listener for "item:add" IPC message
ipcMain.on('item:add', function (e, item) {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});
// Event listener for "Refresh" IPC message
ipcMain.on('refresh', function () {
  mainWindow.reload();
});
// Create an array of menus
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add new item',
        click() {
          addWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'Add new item',
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });

          addWindow.loadFile(path.join(__dirname, 'add.html'));
        },
      },
      {
        label: 'Update',
        click() {
          addWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: 'Update',
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });

          addWindow.loadFile(path.join(__dirname, 'update.html'));
        },
      },
      {
        label: 'Refresh',
        click() {
          mainWindow.reload();
        },
      },
      {
        label: 'Clear all item',
        click() {
          mainWindow.webContents.send('item:clear');
        },
      },
      {
        label: 'Quit/Exit',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Help',
  },
];

