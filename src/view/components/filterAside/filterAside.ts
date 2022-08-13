import './filterAside.css';
import { BaseComponent } from '../baseComponent';

const html = `
  <h2 class="filters__h2 visually-hidden">Фильтры</h2>
`;

export class FilterAside extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('aside', ['filters'], parentNode, html)
  }
}