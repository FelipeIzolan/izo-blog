codeInput.registerTemplate(
  "syntax-highlighted",
  codeInput.templates.prism(
    Prism,
    [
      new codeInput.plugins.Indent(true, 2)
    ]
  )
);

routes.li_onclick = set;
creator.button_onclick = create;

//--------------------------------------------------------//

document.onkeydown = (e) => {
  const key = `${e.ctrlKey ? 'CTRL + ' : ''}${e.key.replace(' ', 'Space')}`;

  console.log(key)

  if (routes.style.display == 'none' && shortcuts[key]) {
    e.preventDefault();
    return shortcuts[key]();
  }

  if ((routes.style.display == 'block' || creator.style.display == 'block') && in_shortcuts[key]) {
    e.preventDefault();
    return in_shortcuts[key]();
  }
}
