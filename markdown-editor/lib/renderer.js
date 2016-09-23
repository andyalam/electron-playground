const { remote } = require('electron');
const mainProcess = remote.require('./main.js');
const { showOpenFileDialog } = mainProcess;

const $ = require('jquery');
const marked = require('marked');

const $markdownView = $('.raw-markdown');
const $htmlView = $('.rendered-html');



$markdownView.on('keyup', function() {
  var content = $(this).val();
  renderMarkdownToHtml(content);
});

$('#open-file').on('click', function() {
  showOpenFileDialog();
})


function renderMarkdownToHtml(markdown) {
  var html = marked(markdown, { sanitize: true });
  $htmlView.html(html);
}
