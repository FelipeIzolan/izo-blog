const editor = document.querySelector('#editor');
const editor_box = editor.querySelector('code-input');
const editor_panel = editor.querySelector('div');

const preview = document.querySelector('#preview');
const preview_iframe = preview.querySelector('iframe');

const preview_select = preview.querySelector('div');
const preview_select_input = preview_select.querySelector('input');
const preview_select_list = preview_select.querySelector('ul');

var pages = [];
var templates = [];
var ul_index = 0;

//--------------------------------------------------------//

const select_shortcuts = {
  ['Enter']: () => set(),
  ['ArrowUp']: () => move(-1),
  ['ArrowDown']: () => move(1),
  ['CTRL + d']: () => create()
}

const content_shortcuts = {
  ['CTRL + a']: () => toggle(),
  ['CTRL + s']: () => save(),
  ['CTRL + d']: () => create()
}

//--------------------------------------------------------//

function generateSelectList() {
  preview_select_list.innerHTML = pages.reduce(
    (acc, curr, index) => acc + `<li onclick='set()' onmouseover='select(${index})'>${curr}</li>`,
    ''
  );
}

function generateTemplatesPrompt() {
  return templates.reduce((acc, curr, index) => acc + `${index}. ${curr}\n`, '');
}

//--------------------------------------------------------//

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

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
