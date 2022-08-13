import './productsSection.css';
import { BaseComponent } from '../baseComponent';

const html = `
  <h2 class="visually-hidden">Товары</h2>
`;

export class ProductsSection extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('section', ['products'], parentNode, html)
  }
}