import { properties } from '../productProperties'
import { products } from '../products';
import { FilterType, IFilterObj, IProduct, IFilterValues, SortType } from './types/types'
import { Container } from "./components/container/container";
import { Header } from "./components/header/header";
import { Logo } from "./components/logo/logo";
import { Search } from "./components/search/search";
import { Cart } from "./components/cart/cart";
import { Main } from "./components/main/main";
import { FilterAside } from "./components/filterAside/filterAside";
import { Filter } from "./components/filter/filter";
import { ResetFilters } from './components/resetFilters/resetFilters';
import { ClearLocalStorageButton } from './components/clearLocalStorageButton/clearLocalStorageButton';
import { ProductsSection } from './components/productsSection/productsSection';
import { SortingHeader } from './components/sortingHeader/sortingHeader';
import { Sort } from "./components/sort/sort";
import { ProductsUl } from './components/productsUl/productsUl';
import { ProductCard } from './components/productCard/productCard';
import { Footer } from "./components/footer/footer";


export class View {
  private header;
  private container;
  private logo;
  private search;
  private cart;
  private main;
  private filterAside;
  private resetFiltersButton;
  private clearLocalStorageButton: ClearLocalStorageButton | null;
  private productsSection;
  private sortingHeader;
  private productsUl;
  private footer;
  private filters: Filter[];
  public sortings: Sort[];
  constructor() {
    this.container = new Container();
    this.header = new Header(this.container.node);
    this.logo = new Logo(this.header.node);
    this.search = new Search(this.header.node);
    this.cart = new Cart(this.search.node);
    this.main = new Main(this.container.node);
    this.filterAside = new FilterAside(this.main.node);
    this.resetFiltersButton = new ResetFilters(this.filterAside.node);
    this.clearLocalStorageButton = null;
    this.productsSection = new ProductsSection(this.main.node);
    this.sortingHeader = new SortingHeader(this.productsSection.node);
    this.sortings = [];
    this.productsUl = new ProductsUl(this.productsSection.node);
    this.footer = new Footer(this.container.node);
    this.filters = [];
  }

  getFilters(): IFilterObj[] {
    const propObj: IFilterObj[] = [];
    for (const key in properties) {
      if (properties[key].type === FilterType.enum) {
        const slug = properties[key].slug as keyof IProduct;
        const vals = products.reduce((acc: string[], x) => {
          acc.push(x[slug].toString());
          return acc;
        }, []);
        propObj.push({
          name: properties[key].name,
          slug: properties[key].slug as keyof IProduct,
          type: FilterType.enum,
          min: null,
          max: null,
          values: [...new Set(vals)].filter(x => x)
        });
      }
      if (properties[key].type === FilterType.number) {
        const slug = properties[key].slug as keyof IProduct;
        const vals = products.reduce((acc: string[], x) => {
          acc.push(x[slug].toString());
          return acc;
        }, []).map(Number);
        const min = Math.min(...vals);
        const max = Math.max(...vals);
        propObj.push({
          name: properties[key].name,
          slug: properties[key].slug as keyof IProduct,
          type: FilterType.number,
          min: min,
          max: max,
          values: []
        });
      }
    }
    return propObj;
  }

  updateProducts(products: IProduct[], addToCartHandler: (id: number) => void, removeFromCartHandler: (id: number) => void) {
    this.productsUl.node.innerHTML = '';
    if (products.length === 0) {
      this.productsUl.node.innerHTML = `
        Товары не найдены
      `;
    }
    products.forEach((product) => {
      new ProductCard(this.productsUl.node, product, addToCartHandler, removeFromCartHandler);
    });
  }

  updateCart(cart: number[]) {
    this.cart?.setBadge(cart.length);
  }

  // bindCart(handlerAdd: (id: number) => void, handlerRemove: (id: number) => void) {

  // }

  bindFilterByName(handler: (query: string) => void) {
    this.search.searchField?.addEventListener('input', () => {
      handler(this.search.searchField?.value.toLowerCase());
    })
  }

  bindCommonFilter(handler: (filterValues: IFilterValues) => void, clearLSHandler: () => void) {
    const filtersData = this.getFilters();
    this.filterAside.node.innerHTML = '';
    filtersData.forEach((filter) => {
      this.filters.push(new Filter(this.filterAside.node, filter.name, filter.slug, filter.type, filter.values, filter.min, filter.max, handler));
    });
    this.resetFiltersButton = new ResetFilters(this.filterAside.node);
    this.clearLocalStorageButton = new ClearLocalStorageButton(this.filterAside.node, clearLSHandler);
  }

  bindSortByName(handler: (sortType: SortType) => void) {
    this.sortings.push(new Sort(this.sortingHeader.node, 'по наименованию', handler, SortType.nameAsc));
  }

  bindSortByYear(handler: (sortType: SortType) => void) {
    this.sortings.push(new Sort(this.sortingHeader.node, 'по году выхода на рынок', handler, SortType.yearAsc));
  }

  bindResetFilters(handler: () => void) {
    this.resetFiltersButton.node.addEventListener('click', () => {
      this.filters.forEach((filter) => {
        filter.reset();
      })
      handler();
    });
  }

  bindClearLocalStorage(handler: () => void) {
    this.clearLocalStorageButton?.node.addEventListener('click', () => {
      console.log('clear local storage');
      this.cart.clear();
      this.filters.forEach((filter) => {
        filter.reset();
      });
      handler();
    });
  }
}