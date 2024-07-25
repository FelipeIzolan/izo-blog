class Creator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.input = null;
    this.select = null;
    this.button = null;
    this.button_onclick = null;
  }

  connectedCallback() {
    this.input = document.createElement('input');
    this.select = document.createElement('select');
    this.button = document.createElement('button');

    fetch('/templates')
      .then(res => res.json())
      .then(data =>
        this.select.innerHTML = data.reduce(
          (acc, curr) => acc + `<option value='${curr}'>${curr}</option>`,
          ''
        )
      )

    this.style.cssText = `
      top: 0;
      right: 0;
      width: 480px;
      margin: 12px;
      display: block;
      z-index: 9999;
      position: absolute;
      background: #F2F2F2;
      display: none;
      border-radius: 8px;
      border: 1px solid #212121;
    `;

    this.input.placeholder = 'Title';
    this.input.style.cssText = `
      border: none;
      outline: none;
      background: none;

      width: 100%;
      color: #212121;
      padding: 16px;
      font-size: large;
    `;

    this.select.style.cssText = `
      border: none;
      outline: none;
      background: none;

      width: 100%;
      color: #212121;
      padding: 16px;
      font-size: large;
    `;

    this.button.style.cssText = `
      border: none;
      outline: none;
      cursor: pointer;

      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;

      width: 100%;
      background: #212121;
      color: #F6F6F6;
      padding: 16px;
      font-size: large;
    `;

    this.button.innerHTML = 'Create';
    this.button.onclick = () => this.button_onclick ? this.button_onclick(this.input.value, this.select.value) : null;

    this.shadowRoot.appendChild(this.input);
    this.shadowRoot.appendChild(this.select);
    this.shadowRoot.appendChild(this.button);
  }

  toggle() {
    if (this.style.display == 'block') {
      this.style.display = 'none';
      this.input.value = '';
    } else {
      this.style.display = 'block';
      this.input.focus();
    }
  }

  click() {
    this.button.click();
  }
}

customElements.define('editor-creator', Creator);
