const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

var mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 600 });
  mainWindow.webContents.loadURL(`file://${__dirname}/index.html`);

  //mainWindow.webContents.openDevTools();

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

  if (files) { openFile(files[0]); }
};

const openFile = (file) => {
  const content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content);
}


exports.showOpenFileDialog = showOpenFileDialog;