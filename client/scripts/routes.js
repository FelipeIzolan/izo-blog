class Routes extends HTMLElement {
  constructor() {
    super();

    this.items = [];
    this.index = 0;

    this.li_onclick = null;
    this.input = null;
    this.ul = null;

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    fetch('/pages')
      .then(res => res.json())
      .then(data => this.items = data)

    this.ul = document.createElement('ul');
    this.input = document.createElement('input');

    this.style.cssText = `
      width: 480px;
      max-height: 600px;
      top: 0;
      z-index: 9999;
      position: absolute;
      margin: 12px;
      border-radius: 8px;
      background: #F2F2F2;
      display: none;
      border: 1px solid #F6F6F6;
      overflow-y: auto;
    `;

    this.input.oninput = _ =>
      this.render(this.items.filter(x => x.includes(this.input.value)));

    this.input.placeholder = 'Search';
    this.input.style.cssText = `
      border: none;
      outline: none;
      background: none;

      width: 100%;
      color: #212121;
      padding: 16px;
      font-size: large;
      box-sizing: border-box;
    `;

    this.ul.style.cssText = `
      margin: 0;
      padding: 0;
      list-style: none; 
    `;

    this.shadowRoot.appendChild(this.input);
    this.shadowRoot.appendChild(this.ul);
  }

  toggle() {
    if (this.style.display == 'block') {
      this.style.display = 'none';
      this.input.value = '';
    } else {
      this.style.display = 'block';
      this.input.focus();
      this.render();
    }
  }

  get() {
    return this.ul.children[this.index];
  }

  setIndex(index, scroll = false) {
    index = Math.min(Math.max(index, 0), this.ul.children.length - 1);

    let cur = this.ul.children[this.index];
    if (cur) {
      cur.style.color = '#212121';
      cur.style.background = 'none';
    };

    this.index = index;
    cur = this.ul.children[this.index];

    cur.style.color = '#F6F6F6';
    cur.style.background = '#212121';

    if (scroll)
      cur.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  render(items) {
    items = items ?? this.items;
    this.ul.innerHTML = ``;

    for (let index in items) {
      const li = document.createElement('li');

      li.onmouseover = () => this.setIndex(index);
      li.onclick = () => this.li_onclick ? this.li_onclick() : null;

      li.innerText = items[index];
      li.style.cssText = `
        padding: 16px;
        cursor: pointer;
        color: #212121;
      `;

      this.ul.appendChild(li);
    }

    this.setIndex(0);
  }
}

customElements.define('editor-routes', Routes);
