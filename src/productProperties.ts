import { FilterType } from "./view/types/types";

export const properties = [
  {
    slug: 'quantity',
    name: 'Количество',
    type: FilterType.number,
  },
  {
    slug: 'popularity',
    name: 'Популярность',
    type: FilterType.enum,
  },
  {
    slug: 'manufacturer',
    name: 'Производитель',
    type: FilterType.enum,
  },
  {
    slug: 'cameraQuantity',
    name: 'Количество камер',
    type: FilterType.enum,
  },
  {
    slug: 'color',
    name: 'Цвет',
    type: FilterType.enum,
  },
  {
    slug: 'year',
    name: 'Год выхода на рынок',
    type: FilterType.number,
  }
]