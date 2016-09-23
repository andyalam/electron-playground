const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const ActiveFile = require('./active-file.js');

let mainWindow = null;
let activeFile = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 600 });
  activeFile = new ActiveFile(mainWindow);

  mainWindow.webContents.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


const showOpenFileDialog = () => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {name: 'Markdown', extensions: ['md', 'markdown'] },
      {name: 'Text File', extensions: ['txt'] }
    ]
  });

  if (files) { activeFile.open(files[0]); }
};



module.exports = {
  showOpenFileDialog,
  get activeFile() { return activeFile; }
};