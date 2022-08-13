import './container.css';
import { BaseComponent } from '../baseComponent';

export class Container extends BaseComponent {
  constructor() {
    super('div', ['container'], document.body, '');
  }
}
