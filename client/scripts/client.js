codeInput.registerTemplate(
  "syntax-highlighted",
  codeInput.templates.prism(
    Prism,
    [
      new codeInput.plugins.Indent(true, 2)
    ]
  )
);

//--------------------------------------------------------//

async function get(path) {
  let req = await fetch(path)
  let data = await req.json();

  return data;
}

get('/pages').then(data => {
  pages = data;
  generateSelectList();
});

get('/templates').then(data => {
  templates = data
});

//--------------------------------------------------------//

document.onkeydown = (e) => {
  const key = `${e.ctrlKey ? 'CTRL + ' : ''}${e.key}`;

  if (preview.dataset.route == '' && select_shortcuts[key]) {
    e.preventDefault();
    select_shortcuts[key]();
  }

  if (preview.dataset.route != '' && content_shortcuts[key]) {
    e.preventDefault();
    content_shortcuts[key]();
  }
}

preview_select_input.oninput = () => {
  for (const child of preview_select_list.children) {
    child.style.display =
      child.innerText.includes(preview_select_input.value) ?
        'block' :
        'none';
  }
}
