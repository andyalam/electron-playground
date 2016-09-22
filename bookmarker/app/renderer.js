const parser = new DOMParser();

const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStoragebutton = document.querySelector('.clear-storage');

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

newLinkForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = newLinkUrl.value;
  fetch(url)
    .then(response => response.text())
    .then(parseResponse)
    .then(findTitle)
    .then(title => storeLink(title, url))
    .then(clearForm)
    .then(renderLinks);
});

clearStoragebutton.addEventListener('click', function clearStorage() {
  localStorage.clear();
  linksSection.innerHTML = '';
})

function clearForm() {
  newLinkUrl.value = null;
  newLinkSubmit.disabled = true;
}

function parseResponse(text) {
  return parser.parseFromString(text, 'text/html');
}

function findTitle(nodes) {
  return nodes.querySelector('title').innerText;
}

function storeLink(title, url) {
  localStorage.setItem(url, JSON.stringify({ title: title, url: url }))
}

function getLinks() {
  return Object.keys(localStorage)
               .map(key => JSON.parse(localStorage.getItem(key)));
}

function convertToElement(link) {
  return `<div class="link">
            <h3>${link.title}</h3>
            <p><a href="${link.url}">${link.url}</a></p>
          </div>`
}

function renderLinks() {
  const linkElements = getLinks().map(convertToElement).join('');
  linksSection.innerHTML = linkElements;
}

// render from localStorage when the window initially opens
renderLinks();