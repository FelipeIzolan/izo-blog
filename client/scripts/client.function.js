function create(title, template) {
  if (preview.dataset.route == '') return toast('⚠️ No document found');

  fetch('/create', {
    method: "PUT",
    body: JSON.stringify({ title, template }),
    headers: {
      'Content-Route': preview.dataset.route,
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.status == 400) throw '⛔ Document already exists'
      else return res.text()
    })
    .then(route => {
      routes.items.push(route);
      preview.dataset.route = route;
      toast('✅ Created!');
      set(false);
    })
    .catch(err => toast(err))

  creator.toggle();
}

function save() {
  if (preview.dataset.route == '') return toast('⚠️ No document found');

  fetch('/save', {
    method: "PUT",
    body: editor_box.value,
    headers: {
      'Content-Route': preview.dataset.route,
      'Content-Type': 'text/plain'
    },
  }).then(() => toast('💾 Saved!'));
}

//--------------------------------------------------------//

function set(from_routes = true) {
  let route = from_routes ? routes.get().innerText : preview.dataset.route;

  preview.dataset.route = route;
  editor_panel.children[3].innerText = route;

  preview.src = `http://localhost:5173${preview.dataset.route}`;

  fetch('/content', {
    method: "POST",
    headers: { 'Content-Route': preview.dataset.route },
  })
    .then(res => res.json())
    .then(({ ext, content }) => {
      editor_box.value = content;
      editor_box.setAttribute('language', ext == 'mdx' ? 'md' : ext)
    })

  editor_box.focus();
  if (from_routes)
    routes.toggle();
}
