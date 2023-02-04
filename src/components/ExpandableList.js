class ExpandableList extends HTMLUListElement {
  constructor() {
    super();

    this.style.position = 'relative';

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.style.position = 'absolute';
    this.toggleBtn.style.border = 'none';
    this.toggleBtn.style.background = 'none';
    this.toggleBtn.style.padding = 0;
    this.toggleBtn.style.top = 0;
    this.toggleBtn.style.left = '5px';
    this.toggleBtn.style.cursor = 'pointer';
    this.toggleBtn.innerText = '>';

    this.toggleBtn.addEventListener('click', () => {
      this.dataset.expanded = !this.isExpanded;
    });

    this.appendChild(this.toggleBtn);
  }

  static get observedAttributes() {
    return ['data-expanded'];
  }

  get isExpanded() {
    console.log({ expanded: this.dataset.expanded });
    return this.dataset.expanded !== undefined && this.dataset.expanded !== 'false';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({ name, oldValue, newValue });
    if (name === 'data-expanded') {
      this.updateStyles(newValue);
    }
  }

  connectedCallback() {
    this.updateStyles();
  }

  updateStyles() {
    console.log('update-styles', this.isExpanded)
    const transform = this.isExpanded ? 'rotate(90deg)' : '';
    this.toggleBtn.style.transform = transform;

    [...this.children].forEach(child => {
      if (child !== this.toggleBtn) {
        child.style.display = this.isExpanded ? '' : 'none';
      }
    });
  }
}

customElements.define('expandable-list', ExpandableList, { extends: 'ul' });