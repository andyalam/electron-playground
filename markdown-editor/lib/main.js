const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

var mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1000, height: 600 });
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
      {name: 'Text File', extensions: ['txt'] },
      {name: 'Markdown', extensions: ['md'] }
    ]
  });

  if (!files) { return; }

  const file = files[0];
  const content = fs.readFileSync(file).toString();

  console.log(content);
};


exports.showOpenFileDialog = showOpenFileDialog;