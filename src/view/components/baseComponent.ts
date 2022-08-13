import './baseComponent.css';
import '../css/normalize.css';
import '../css/visuallyHidden.css';

export class BaseComponent {
  private parentNode: HTMLElement | null;
  public node: HTMLElement;
  constructor(tagName: string, classNames: string[], parentNode: HTMLElement | null, content = '') {
    this.parentNode = parentNode;
    this.node = document.createElement(tagName);
    this.node.innerHTML = content;
    this.node.classList.add(...classNames);
    if (this.parentNode !== null) {
      this.parentNode.append(this.node);
    }
  }
}