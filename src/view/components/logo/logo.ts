import './logo.css';
import { BaseComponent } from '../baseComponent';
import logoSVG from '../../../assets/img/logo1.svg';

const html = `
  <div class="logo__img-wrapper">
    <img class="logo__img" src="${logoSVG}" alt="online store logo">
  </div>
  <div class="logo__name">
    Online Store
  </div>
`;

export class Logo extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('div', ['logo'], parentNode, html);
  }
}