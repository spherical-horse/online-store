import './header.css';
import { BaseComponent } from "../baseComponent";

export class Header extends BaseComponent {
  constructor(container: HTMLElement) {
    super('header', ['header'], container, '');
  }
}