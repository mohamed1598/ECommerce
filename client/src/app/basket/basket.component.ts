import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService){
    this.basket$ = basketService.basket$ as Observable<IBasket>;
  }

  removeBaketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }
}
