import { products } from '../products';
import { IFilterValues, FilterType, IProduct, SortType } from '../view/types/types'

export class Model {
  public products;
  public cart: number[];
  private onProductsChanged;
  private onCartChanged;
  constructor(onDataChanged: () => void, onCartChanged: () => void) {
    this.products = products;
    this.cart = this.getCartFromLocalStorage();
    this.onProductsChanged = onDataChanged;
    this.onCartChanged = onCartChanged;
  }

  getCartFromLocalStorage(): number[] {
    const cartStr = localStorage.getItem('cart') || '[]';
    const cartLs = JSON.parse(cartStr);
    return cartLs;
  }

  addToCart(id: number) {
    const cartLs = this.getCartFromLocalStorage();
    if (!cartLs.includes(id)) {
      cartLs.push(id);
    }
    if (!this.cart.includes(id)) {
      this.cart.push(id);
    }
    localStorage.setItem('cart', JSON.stringify(cartLs));
    this.onCartChanged();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((x) => x !== id);
    const cartLs = this.getCartFromLocalStorage();
    const cart = cartLs.filter((item) => item !== id);
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.onCartChanged();
  }

  clearCart() {
    this.cart = [];
    this.onCartChanged();
  }

  resetModel() {
    this.products = products;
  }

  filterByName(products: IProduct[], str: string) {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(str.toLowerCase()));
    // this.onProductsChanged();
    return filtered;
  }

  applyfilter(products: IProduct[], filter: IFilterValues) {
    if (filter.type === FilterType.enum) {
      if (filter.values?.length && filter.values.length > 0) {
        products = products.filter((product) => filter.values?.some((value) => value === String(product[filter.slug])));
      }
    } else {
      // Здесь typescript ругался на object is possibly null относительно filters.min и filters.max
      // Почему проверка if (filters.min && filters.max) не устраняла эту ошибку?
      products = products.filter((product) => product[filter.slug] >= (filter.min as number) && product[filter.slug] <= (filter.max as number));
    }
    return products;
  }

  applySort(products: IProduct[]) {
    const sortStr = localStorage.getItem('sort') || '""';
    const sort = JSON.parse(sortStr);
    if (sort) {
      if (sort === SortType.nameAsc) return [...products].sort((a, b) => a.name.localeCompare(b.name));
      if (sort === SortType.nameDesc) return [...products].sort((a, b) => b.name.localeCompare(a.name));
      if (sort === SortType.yearAsc) return [...products].sort((a, b) => a.year - b.year);
      if (sort === SortType.yearDesc) return [...products].sort((a, b) => b.year - a.year);
    }
    return products;
  }

  filter(query?: string) {
    const filtersStr = localStorage.getItem('filters') || '{}';
    const filters = JSON.parse(filtersStr);
    let filtered = products;
    if (query) {
      filtered = this.filterByName(filtered, query);
    }
    for (const filter in filters) {
      filtered = this.applyfilter(filtered, filters[filter]);
    }
    filtered = this.applySort(filtered);
    this.products = filtered;
    this.onProductsChanged();
  }
}