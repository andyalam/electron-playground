const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

const ActiveFile = require('./active-file.js');

let mainWindow = null;
let activeFile = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 600 });
  activeFile = new ActiveFile(mainWindow);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  app.on('open-file', (event, file) => {
    activeFile.open(file);
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

const updateEditedState = (content) => {
  activeFile.isEdited = compareContents(content);
  mainWindow.setDocumentEdited(activeFile.isEdited);
}


module.exports = {
  showOpenFileDialog,
  get activeFile() { return activeFile; }
};