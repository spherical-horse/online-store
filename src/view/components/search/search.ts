import { BaseComponent } from '../baseComponent';
import './search.css';

const html = `
<input type="search" autofocus name="search" autocomplete="off" class="search__field"
  placeholder="Искать товары">
<button type="submit" class="search__button">Найти</button>
`

export class Search extends BaseComponent {
  public searchField;
  constructor(parentNode: HTMLElement) {
    super('form', ['search'], parentNode, html);
    this.searchField = this.node.querySelector('.search__field') as HTMLInputElement;
  }
}