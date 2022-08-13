import { BaseComponent } from '../baseComponent';
import { FilterType, IFilterValues, IProduct } from '../../types/types';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './filter.css';

export class Filter extends BaseComponent {
  private filterName;
  private filterType;
  private values;
  private min;
  private max;
  private slug;
  private sliderValues: string[];
  private lsFilters;
  private sliderElement: noUiSlider.target | null;
  private callback;
  constructor(
    parentNode: HTMLElement, filterName: string, slug: keyof IProduct, filterType: FilterType, values: string[] | null, min: number | null, max: number | null,
    callback: (filterValues: IFilterValues) => void
  ) {
    super('section', ['filters__section'], parentNode, '');
    this.filterName = filterName;
    this.slug = slug;
    this.filterType = filterType;
    this.values = values;
    this.min = min;
    this.max = max;
    this.sliderValues = [];
    this.callback = callback;
    const filtersStr = localStorage.getItem('filters') || '{}';
    this.lsFilters = JSON.parse(filtersStr)[slug];
    this.sliderElement = null;
    this.createHeader();
    this.createFilter();
  }

  get filterValues(): IFilterValues {
    if (this.filterType === FilterType.enum) {
      const inputs = this.node.querySelectorAll('input');
      const values = [...inputs].filter((x) => x.checked).map((x) => x.name);
      return {
        type: this.filterType,
        slug: this.slug,
        values: values,
        min: null,
        max: null,
      }
    } else {
      return {
        type: this.filterType,
        slug: this.slug,
        values: [],
        min: Number(this.sliderValues[0]),
        max: Number(this.sliderValues[1]),
      }
    }
  }

  private createHeader() {
    const header = document.createElement('h3');
    header.classList.add('filters__h3');
    header.textContent = this.filterName;
    this.node.append(header);
  }

  private createFilter() {
    if (this.filterType === FilterType.enum) {
      if (this.values) {
        this.values.forEach((value) => {
          const label = this.createEnumField(value, this.slug);
          this.node.append(label);
        });
      }
    }
    if (this.filterType === FilterType.number) {
      const div = this.createNumberField(this.filterName, this.slug, this.min, this.max);
      this.node.append(div);
    }
  }

  private createEnumField(name: string, slug: string) {
    const label = document.createElement('label');
    label.classList.add('filters__label');
    let isChecked = false;
    if (this.lsFilters) {
      isChecked = this.lsFilters.values.includes(name);
    }
    label.innerHTML = `
      <input class="filters__input" ${isChecked ? 'checked' : ''} name="${name}" data-value="${slug}" type="checkbox">
      <span class="filters__option">${name}</span>
    `;
    label.addEventListener('change', () => {
      this.callback(this.filterValues);
    })
    return label;
  }

  private createNumberField(name: string, slug: string, min: number | null, max: number | null) {
    const div = document.createElement('div');
    div.classList.add('range-slider');
    div.innerHTML = `
      <div class="range-slider__bar" id="slider${slug}"></div>
      <div class="range-slider__numbers-wrapper">
        <div class="range-slider__begin" id="slider${slug}Begin">
          ${min}
        </div>
        <div class="range-slider__end" id="slider${slug}End">
          ${max}
        </div>
      </div>
    `;
    const selector = `#slider${slug}`;
    let startNumber = min;
    let endNumber = max;
    if (this.lsFilters) {
      startNumber = this.lsFilters.min ? this.lsFilters.min : min;
      endNumber = this.lsFilters.max ? this.lsFilters.max : max;
      // console.log(start, end);
    }
    this.sliderElement = div.querySelector(selector) as noUiSlider.target;
    if (min && max) {
      noUiSlider.create(this.sliderElement, {
        start: [startNumber as number, endNumber as number],
        connect: true,
        step: 1,
        range: {
          'min': min,
          'max': max
        }
      });
      const beginSelector = `#slider${slug}Begin`;
      const endSelector = `#slider${slug}End`;
      const begin = div.querySelector(beginSelector) as HTMLElement;
      const end = div.querySelector(endSelector) as HTMLElement;
      if (begin && end) {
        this.sliderElement.noUiSlider?.on('update', (values) => {
          begin.innerText = String(values[0]).split('.')[0];
          end.innerText = String(values[1]).split('.')[0];
          this.sliderValues = values.map(String).map(x => x.split('.')[0]);
        });
        this.sliderElement.noUiSlider?.on('change', () => {
          this.callback(this.filterValues);
        });
      }
    }
    return div;
  }

  reset() {
    if (this.filterType === FilterType.enum) {
      const inputs = this.node.querySelectorAll('input');
      inputs.forEach((input) => {
        input.checked = false;
      });
    } else {
      this.sliderElement?.noUiSlider?.set([Number(this.min), Number(this.max)]);
    }
  }
}