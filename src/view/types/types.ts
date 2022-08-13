export enum FilterType {
  enum,
  number,
}

export enum SortType {
  nameAsc,
  nameDesc,
  yearAsc,
  yearDesc,
  unknown,
}

// export type ProductKeysType = 'id' | 'name' | 'year' | 'color' | 'quantity' | 'manufacturer' | 'cameraQuantity' | 'popularity';

// id: 1,
//     name: 'Iphone 13',
//     year: 2022,
//     color: 'Красный',
//     quantity: 3,
//     manufacturer: 'Apple',
//     cameraQuantity: 3,
//     popularity: 'Только популярные'

export interface IProduct {
  id: number;
  name: string;
  year: number;
  color: string;
  quantity: number;
  manufacturer: string;
  cameraQuantity: number;
  popularity: string;
}

export interface IFilterObj {
  slug: keyof IProduct;
  type: FilterType;
  name: string,
  min: number | null;
  max: number | null;
  values: string[] | null;
}

export interface IFilterValues {
  type: FilterType;
  slug: keyof IProduct,
  values: string[] | null;
  min: number | null;
  max: number | null;
}
