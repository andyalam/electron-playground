const { app, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

class ActiveFile {
    constructor(browserWindow, file = null) {
        this.browserWindow = browserWindow;
        this.open(file);
    }

    open(file) {
        let content = '';
        if (file) {
            content = fs.readFileSync(file).toString();
        }
        
        this.file = file;
        this.content = content;
        this.browserWindow.webContents.send('update-content', this);
        this.updateWindowTitle();
    }

    updateWindowTitle() {
        let title = 'Markdown Editor';

        if (this.file) { title = `${this.file} - ${title}`; }

        this.browserWindow.setTitle(title);
    }
}

module.exports = ActiveFile;