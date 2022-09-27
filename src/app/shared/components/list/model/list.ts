import { Item } from '../item/model/item';

export interface List {
  id?: string;
  title: string;
  items: Item[];
}
