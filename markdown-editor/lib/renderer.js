const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main.js');
const { showOpenFileDialog } = mainProcess;

const $ = require('jquery');
const marked = require('marked');

const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');

function renderMarkdownToHtml(markdown) {
  const html = marked(markdown, { sanitize: true });
  $htmlView.html(html);
}

$markdownView.on('keyup', function() {
  const content = $(this).val();
  renderMarkdownToHtml(content);
});

$('#open-file').on('click', () => {
  showOpenFileDialog();
});

$('#save-html').on('click', () => {
  mainProcess.activeFile.saveHtml();
});

ipcRenderer.on('update-content', (event, file) => {
  $markdownView.val(file.content);
  renderMarkdownToHtml(file.content);
});
