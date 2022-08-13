import './productsUl.css';
import { BaseComponent } from '../baseComponent';

export class ProductsUl extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('ul', ['products__ul'], parentNode);
  }
}