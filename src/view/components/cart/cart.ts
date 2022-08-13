import { BaseComponent } from '../baseComponent';
import './cart.css';

const html = `
  <img class="search__cart-img" src="./assets/img/cart-icon.svg" alt="Корзина">
  <div class="search__cart-badge">
    1
  </div>
`;

export class Cart extends BaseComponent {
  public badge: HTMLElement;
  constructor(parentNode: HTMLElement) {
    super('div', ['search__cart'], parentNode, html);
    this.badge = this.node.querySelector('.search__cart-badge') as HTMLElement;
    this.onLoad();
  }

  get cart() {
    const cartLs = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(cartLs);
    return cart;
  }

  clear() {
    localStorage.removeItem('cart');
    this.onLoad();
  }

  onLoad() {
    this.badge.innerHTML = this.cart.length;
    if (this.cart.length > 0) {
      this.showBadge();
    } else {
      this.hideBadge();
    }
  }

  setBadge(value: number) {
    if (value > 0) {
      this.showBadge();
    } else {
      this.hideBadge();
    }
    this.badge.innerHTML = value.toString();
  }

  public hideBadge() {
    this.badge.style.display = 'none';
  }

  public showBadge() {
    this.badge.style.display = 'flex';
  }
}