// interfaces.ts

export interface Item {
  id: string;
  title: string;
  price: string;
  shipping: string;
  location: string;
  rating: string;
  image: string;
  url: string;
}

export interface ApiResponse {
  results?: Item[]; // Hacer que 'results' sea opcional
}