import './footer.css';
import RsSchoolLogo from '../../../assets/img/rs_school.svg';
import { BaseComponent } from '../baseComponent';

const html = `
  <div class="footer__rs-logo">
    <a href="https://rs.school">
      <img class="footer__rs-logo-img" src="${RsSchoolLogo}" alt="rolling scopes school logo">
    </a>
  </div>
  <div class="footer__github">
    <a href="https://github.com/spherical-horse">Spherical Horse</a>
  </div>
  <div class="footer__year">
    2022
  </div>
`;

export class Footer extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super('footer', ['footer'], parentNode, html);
  }
}