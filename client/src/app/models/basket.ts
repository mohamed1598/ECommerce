import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
    id: string;
    items: IBasketItem[];
    clientSecret?:string;
    paymentIntentId?:string;
    deliveryMethodId?:number;
    shippintPrice?:number;
  }
  
  export interface IBasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    brand: string
    type: string
  }
  export class Basket implements IBasket{
      id: string = uuidv4();
      items: IBasketItem[]= [];
  }
  export interface IBasketTotals{
    shipping: number;
    subTotal: number;
    total: number;
  }