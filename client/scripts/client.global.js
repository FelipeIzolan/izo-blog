const preview = document.querySelector('iframe');

const routes = document.querySelector('editor-routes');
const creator = document.querySelector('editor-creator');

const editor = document.querySelector('#editor');
const editor_box = editor.querySelector('code-input');
const editor_panel = editor.querySelector('div');

var pages = [];
var templates = [];
var ul_index = 0;

//--------------------------------------------------------//

const shortcuts = {
  'CTRL + Space': () => routes.toggle(),
  'CTRL + d': () => creator.toggle(),
  'CTRL + s': () => save(),
}

const in_shortcuts = {
  ...shortcuts,
  'Enter': () => routes.style.display == 'block' ? set() : creator.style.display == 'block' ? creator.click() : null,
  'ArrowUp': () => routes.style.display == 'block' ? routes.setIndex(routes.index - 1, true) : null,
  'ArrowDown': () => routes.style.display == 'block' ? routes.setIndex(routes.index + 1, true) : null
}

//--------------------------------------------------------//

function toast(text) {
  Toastify({
    text,
    duration: 2000,
    style: {
      width: "max-content",
      color: "#212121",
      background: "#F6F6F6",
      border: '1px solid #212121',
      ['border-radius']: "6px",
      ['box-shadow']: 'none'
    }
  }).showToast()
}
