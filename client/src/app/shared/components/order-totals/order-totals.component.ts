import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from 'src/app/models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent {
  basketTotal$:Observable<IBasketTotals|any>;

  constructor(private basketService:BasketService){
    this.basketTotal$ = this.basketService.basketTotal$;
  }
}
