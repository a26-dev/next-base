const template = document.createElement('template');
template.innerHTML = `
  <style>
    label {
      color: green;
      display: block;
    }
    slot[name="description"] {
      color: #777;
      font-size: 0.75rem;
    }
  </style>

  <label>
    <input type="checkbox">
    <slot></slot>
    <slot name="description"></slot>
  </label>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();

    // creates chadow = this.shadowRoot
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(template.content.cloneNode(true));
    this.checkbox = shadow.querySelector('input');
  }

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
    if (name === 'checked') {
      this.updateChecked(newValue);
    }
  }

  connectedCallback() {
    console.log('connected');
  }

  disconnectedCallback() {
    console.log('disconnected');
  }


  updateChecked(value) {
    this.checkbox.checked = value !== null && value !== 'false';
  }
}

customElements.define('todo-item', TodoItem);
