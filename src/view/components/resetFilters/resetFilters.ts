import './resetFilters.css';
import { BaseComponent } from '../baseComponent';

export class ResetFilters extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('button', ['filters__reset-button'], parentNode, 'Сбросить');
  }

}