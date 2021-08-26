import { History } from "history";

export interface Product {
  name: string;
  image_url: string;
  price: number;
  description: string;
  id: number;
}

export interface IHistory {
  history: History;
}
