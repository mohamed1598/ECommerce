import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent {
  order:IOrder|any;
  constructor(private router: Router){
    const navigation = router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if(state){
      this.order = state as IOrder
    }
  }

}
