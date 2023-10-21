import { Component, EventEmitter, Input, OnInit ,Output} from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$:Observable<IBasket>;
  @Input() isBasket:boolean = false;
  @Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  constructor(private basketService:BasketService){
    this.basket$ = this.basketService.basket$ as Observable<IBasket>;

  }
  ngOnInit(): void {
  }

  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item);
  }
  incrementItemQuantity(item:IBasketItem){
    this.increment.emit(item);
  }
  removeBasketItem(item:IBasketItem){
    this.remove.emit(item);
  }

}
