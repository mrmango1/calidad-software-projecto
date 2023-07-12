export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface Customer {
  _id: string;
  name: string;
  address: string;
  mail: string;
  phone: number;
  birthday: Date;
}