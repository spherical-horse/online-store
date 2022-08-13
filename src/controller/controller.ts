import { Model } from "../model/model";
import { View } from "../view/view";
import { IFilterValues, SortType } from "../view/types/types";

export class Controller {
  private model: Model;
  private view: View;
  constructor() {
    this.view = new View();
    this.model = new Model(this.onModelChanged.bind(this), this.onCartChanged.bind(this));
    this.model.filter();
    this.view.updateProducts(this.model.products, this.handleAddToCart.bind(this), this.handleRemoveFromCart.bind(this));
    this.view.bindFilterByName(this.handleSearch.bind(this));
    this.view.bindCommonFilter(this.handleFilter.bind(this), this.handleClearLs.bind(this));
    this.view.bindSortByName(this.handleNameSort.bind(this));
    this.view.bindSortByYear(this.handleYearSort.bind(this));
    this.view.bindResetFilters(this.handleResetFilters.bind(this));
    this.view.bindClearLocalStorage(this.handleClearLs.bind(this));
    // this.view.bindCart(this.handleAddToCart.bind(this), this.handleRemoveFromCart.bind(this));
    // this.view.bindSort(this.handleSort.bind(this));
  }

  start() {
    console.log('start');
  }

  onModelChanged() {
    this.view.updateProducts(this.model.products, this.handleAddToCart.bind(this), this.handleRemoveFromCart.bind(this));
  }

  onCartChanged() {
    this.view.updateCart(this.model.cart);
  }

  handleSearch(query: string) {
    this.model.filter(query);
  }

  handleFilter(filterValues: IFilterValues) {
    const filtersStr = localStorage.getItem('filters') || '{}';
    const filters = JSON.parse(filtersStr);
    filters[filterValues.slug] = filterValues;
    localStorage.setItem('filters', JSON.stringify(filters));
    this.model.filter();
  }

  clearSortButtons() {
    this.view.sortings.forEach((sorting) => {
      sorting.clearButton();
    })
  }

  handleNameSort(sortType: SortType) {
    this.clearSortButtons();
    const sortStr = localStorage.getItem('sort') || '""';
    let sort = JSON.parse(sortStr);
    sort = sortType;
    localStorage.setItem('sort', sort);
    this.model.filter();
  }

  handleYearSort(sortType: SortType) {
    this.clearSortButtons();
    const sortStr = localStorage.getItem('sort') || '""';
    let sort = JSON.parse(sortStr);
    sort = sortType;
    localStorage.setItem('sort', sort);
    this.model.filter();
  }

  handleResetFilters() {
    localStorage.removeItem('filters');
    this.model.filter();
  }

  handleAddToCart(id: number) {
    this.model.addToCart(id);
  }

  handleRemoveFromCart(id: number) {
    this.model.removeFromCart(id);
  }

  handleClearLs() {
    // console.log('clearLs');
    this.model.clearCart();
    localStorage.clear();
    this.handleResetFilters();
  }
}