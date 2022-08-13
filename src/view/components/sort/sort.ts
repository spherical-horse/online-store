import './sort.css';
import { BaseComponent } from '../baseComponent';
import { SortType } from '../../types/types';

export class Sort extends BaseComponent {
  public button;
  private callback;
  private currentSort;
  constructor(parentNode: HTMLElement, text: string, handler: (sortType: SortType) => void, defaultSort: SortType) {
    super('span', ['products__sorting'], parentNode);
    this.callback = handler;
    this.currentSort = defaultSort;
    this.node.innerText = text;
    this.button = document.createElement('button');
    this.button.classList.add('products__sort-button');
    parentNode.append(this.button);
    this.addListeners();
    this.onLoad();
  }

  get currentSortValue(): SortType {
    const sortStr = localStorage.getItem('sort') || '""';
    const sort = JSON.parse(sortStr);
    return sort;
  }

  onLoad() {
    const sortStr = localStorage.getItem('sort') || '""';
    const sort = JSON.parse(sortStr);
    if (sort === this.currentSort || sort === this.getNextSort()) {
      this.button.textContent = this.getCurrentButtonText();
    }
  }

  getCurrentButtonText() {
    const sortStr = localStorage.getItem('sort') || '""';
    const sort = JSON.parse(sortStr);
    this.callback(sort)
    if (sort === SortType.yearAsc || sort === SortType.nameAsc) {
      return '🠕';
    }
    return '🠗';
  }

  getNextSort(): SortType {
    if (this.currentSort === SortType.nameAsc) return SortType.nameDesc;
    if (this.currentSort === SortType.nameDesc) return SortType.nameAsc;
    if (this.currentSort === SortType.yearAsc) return SortType.yearDesc;
    return SortType.yearAsc;
  }

  getNextSortButtonText() {
    if (this.getNextSort() === SortType.nameAsc || this.getNextSort() === SortType.yearAsc) {
      return '🠕';
    }
    return '🠗';
  }

  clearButton() {
    this.button.textContent = '';
  }

  addListeners() {
    this.node.addEventListener('click', () => {
      // console.log(this.currentSort, this.getNextSort());

      this.callback(this.currentSort);
      this.currentSort = this.getNextSort();
      this.button.innerText = this.getNextSortButtonText();
    });
  }
}