function create() {
  if (!preview.dataset.route) return toast('⚠️ select a route!');
  if (!templates.length) return toast('❌ no templates found!');

  let template = Number(prompt("Choose a template by index:\n" + generateTemplatesPrompt()));

  if (isNaN(template) || template > templates.length - 1)
    return toast('❌ invalid template.');
  else
    template = templates[template];

  let title = prompt("Type page title: ");

  fetch('/create', {
    method: "PUT",
    body: JSON.stringify({ title, template }),
    headers: {
      'Content-Route': preview.dataset.route,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.text())
    .then(route => {
      pages.push(route);
      generateSelectList();
      ul_index = preview_select_list.children.length - 1;
      set();
    })
}

function save() {
  if (preview.dataset.route == '') return;

  fetch('/save', {
    method: "PUT",
    body: editor_box.value,
    headers: {
      'Content-Route': preview.dataset.route,
      'Content-Type': 'text/plain'
    },
  }).then(() => toast('💾 saved!'));
}

//--------------------------------------------------------//

function toggle() {
  if (preview.dataset.route == '') set();
  else clear();
}

function set() {
  preview_select.style.display = 'none';
  preview_iframe.style.display = 'block';

  let el = preview_select_list.children[ul_index];
  preview.dataset.route = el.innerText;
  editor_panel.children[3].innerText = el.innerText;

  preview_iframe.src = `http://localhost:5173${preview.dataset.route}`;

  let source = fetch('/content', {
    method: "POST",
    headers: { 'Content-Route': preview.dataset.route },
  });

  source
    .then(res => res.json())
    .then(({ ext, content }) => {
      editor_box.value = content;
      editor_box.setAttribute('language', ext == 'mdx' ? 'md' : ext)
    })

  editor_box.focus();
}

function clear() {
  preview_select.style.display = 'block';
  preview_iframe.style.display = 'none';

  preview.dataset.route = '';
  preview_select_input.value = '';
  preview_select_input.focus();
  preview_select_input.oninput();

  editor_box.value = '';
  editor_panel.children[3].innerText = '';
}

//--------------------------------------------------------//

function select(index, scroll) {
  preview_select_list.children[ul_index].className = '';
  preview_select_list.children[index].className = 'select';
  ul_index = index;

  if (scroll)
    preview_select_list.children[index].scrollIntoView({ block: "center", behavior: "smooth" });
}

function move(dir) {
  let max = preview_select_list.children.length - 1;
  let index = clamp(ul_index + dir, 0, max);

  while (preview_select_list.children[index].style.display == 'none') {
    index = clamp(index + dir, 0, max);
    if (index == 0 || index == max) {
      index = ul_index;
      break;
    }
  }

  select(index, true);
}
