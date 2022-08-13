import './productCard.css';
import { BaseComponent } from '../baseComponent';
import { IProduct } from '../../types/types';
import { cartCapacity } from '../../../settings'

export class ProductCard extends BaseComponent {
  private product;
  private addToCartButton: HTMLButtonElement | null;
  private addToCartHandler;
  private removeFromCartHandler;
  constructor(parentNode: HTMLElement, product: IProduct, addToCartHandler: (id: number) => void, removeFromCartHandler: (id: number) => void) {
    super('ul', ['products__li'], parentNode);
    this.product = product;
    this.addToCartHandler = addToCartHandler;
    this.removeFromCartHandler = removeFromCartHandler;
    this.renderProduct();
    this.addToCartButton = this.node.querySelector('.product-card__buy-button');
    this.addListeners();
    this.onLoad();
  }

  private renderProduct() {
    this.node.innerHTML = `
    <article class="product-card">
    <div class="product-card__description">
      <div class="product-card__image-wrapper">
        <img class="product-card__image" src="./products/img/${this.product.id}.png" alt="${this.product.name}">
      </div>
      <div class="product-card__properties">
        <h3 class="product-card__h3">
          ${this.product.name}
        </h3>
        <ul class="product-card__properties-ul">
          <li class="product-card__properties-li">
            Цвет: ${this.product.color}
          </li>
          <li class="product-card__properties-li">
            На складе: ${this.product.quantity}
          </li>
          <li class="product-card__properties-li">
            Год выхода: ${this.product.year}
          </li>
          <li class="product-card__properties-li">
            Производитель: ${this.product.manufacturer}
          </li>
          <li class="product-card__properties-li">
            Количество камер: ${this.product.cameraQuantity}
          </li>
          <li class="product-card__properties-li">
            Популярный: ${this.product.popularity}
          </li>
        </ul>
      </div>
    </div>
    <div class="product-card__actions">
      <div class="product-card__price">77 777 ₽</div>
      <button class="product-card__buy-button">${this.isInCart ? 'Убрать' : 'В корзину'}</button>
    </div>
    </article>
    `;
  }

  setInCartClass() {
    this.node.style.backgroundColor = '#f0f8ff';
  }

  resetInCartClass() {
    this.node.style.backgroundColor = '#fff';
  }

  onLoad() {
    if (this.isInCart) this.setInCartClass();
  }

  get isInCart() {
    const cartStr = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(cartStr);
    if (cart.includes(this.product.id)) return true;
    return false;
  }

  private addListeners() {
    this.addToCartButton?.addEventListener('click', () => {
      const cartStr = localStorage.getItem('cart') || '[]';
      const cart = JSON.parse(cartStr);
      if (this.addToCartButton) {
        if (this.addToCartButton.innerText === 'В корзину') {
          if (cart.length < cartCapacity) {
            this.addToCartHandler(this.product.id);
            this.addToCartButton.innerText = 'Убрать';
            this.setInCartClass();
          } else {
            alert('Извините, все слоты заплонены');
          }
        } else {
          this.removeFromCartHandler(this.product.id);
          this.addToCartButton.innerText = 'В корзину';
          this.resetInCartClass();
        }
      }
    })
  }
}