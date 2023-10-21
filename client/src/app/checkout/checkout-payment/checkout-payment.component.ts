import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/models/basket';
import { IOrder } from 'src/app/models/order';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm:FormGroup|any;
  constructor(private BasketService:BasketService,private checkoutService:CheckoutService,private toastr:ToastrService,private router:Router){

  }
  submitOrder(){
    const basket = this.BasketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket as IBasket);
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next:(order:IOrder|any)=>{
        this.toastr.success('Order created successfully');
        this.BasketService.deleteLocalBasket(basket!.id);
        const navigationExtras:NavigationExtras ={state:order};
        this.router.navigate(['checkout/success'],navigationExtras)
        console.log(order);
      },
      error:error=> {
        this.toastr.error(error.message);
        console.log(error);
        
      }
      
    });
  }
  getOrderToCreate(basket: IBasket) {
    return{
      basketId:basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress:this.checkoutForm.get('addressForm').value
    }
  }
}
