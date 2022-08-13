import './sortingHeader.css';
import { BaseComponent } from '../baseComponent';

const html = `
  Сортировать:
  <!-- <span class="products__sorting">по наименованию</span><button class="products__sort-button">↑</button>
  <span class="products__sorting">по году выхода на рынок</span><button class="products__sort-button">↓</button> -->
`;

export class SortingHeader extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('header', ['products__sorting-wrapper'], parentNode, html);
  }


}