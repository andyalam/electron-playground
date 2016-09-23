const $ = require('jquery');
const marked = require('marked');

const $markdownView = $('.raw-markdown'); 
const $htmlView = $('.rendered-html');


$markdownView.on('keyup', function() {
  var content = $(this).val();
  renderMarkdownToHtml(content);
});


function renderMarkdownToHtml(markdown) {
  var html = marked(markdown, { sanitize: true });
  $htmlView.html(html);
}