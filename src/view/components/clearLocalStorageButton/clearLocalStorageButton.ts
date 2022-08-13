import { BaseComponent } from '../baseComponent';

export class ClearLocalStorageButton extends BaseComponent {
  private handler;
  constructor(parentNode: HTMLElement, handler: () => void) {
    super('button', ['filters__reset-button'], parentNode, 'Сбросить LocalStorage');
    this.handler = handler;
    this.addListeners();
  }

  addListeners() {
    this.node.addEventListener('click', () => {
      this.handler();
    });
  }
}