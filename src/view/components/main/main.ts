import { BaseComponent } from '../baseComponent';
import './main.css';

export class Main extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('main', ['main'], parentNode, '');
  }
}