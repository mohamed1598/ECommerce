import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/models/basket';
import { IOrder } from 'src/app/models/order';
import { NavigationExtras, Router } from '@angular/router';

declare var Stripe:any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit,OnDestroy {
  @Input() checkoutForm:FormGroup|any;
  @ViewChild('cardNumber',{static:true}) cardNumberElement:ElementRef|any;
  @ViewChild('cardExpiry',{static:true}) cardExpiryElement:ElementRef|any;
  @ViewChild('cardCvc',{static:true}) cardCvcElement:ElementRef|any;
  stripe:any;
  cardNumber:any;
  cardExpiry:any;
  cardCvc:any;
  cardErrors:any;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  cardHandler = this.onChange.bind(this);
  loading = false;

  constructor(private BasketService:BasketService,private checkoutService:CheckoutService,private toastr:ToastrService,private router:Router){

  }
  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51O5tWHCG2JtLeZU2TQ7XVnPkc4RxJEPJwTJj2fJukmsbzcXelFhsuk8Dl8oMsvv72iyiH7ftFpkSBsveX6tHBj7t00SXJZWGzp');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change',this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change',this.cardHandler);
    
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change',this.cardHandler);
    
  }
  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  onChange(event:any){
    if(event.error != undefined){
      this.cardErrors = event.error.message;
    }else
    {
      this.cardErrors = null
    }
    
    switch(event.elementType){
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }

  async submitOrder(){
    this.loading = true;
    const basket = this.BasketService.getCurrentBasketValue();
    try{
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket as IBasket);
      if(paymentResult.paymentIntent){
        this.BasketService.deleteBasket(basket as IBasket);
        const navigationExtras:NavigationExtras ={state:createdOrder};
        this.router.navigate(['checkout/success'],navigationExtras)
      }else{
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false
    }catch(error){
      this.loading = false
    }
    
    
    // this.checkoutService.createOrder(orderToCreate).subscribe({
    //   next:(order:IOrder|any)=>{
    //      this.stripe.confirmCardPayment(basket?.clientSecret,{
    //       payment_method:{
    //         card: this.cardNumber,
    //         billing_details:{
    //           name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
    //         }
    //       }
    //     }).then((result:any) =>{
    //       console.log(result);
    //       if(result.paymentIntent){
    //         this.BasketService.deleteLocalBasket(basket!.id);
    //         const navigationExtras:NavigationExtras ={state:order};
    //         this.router.navigate(['checkout/success'],navigationExtras)
    //       }else{
    //         this.toastr.error(result.error.message);
    //       }
    //     });
    //   },
    //   error:error=> {
    //     this.toastr.error(error.message);
    //     console.log(error);
        
    //   }
      
    // });
  }
  private async confirmPaymentWithStripe(basket:IBasket) {
    return this.stripe.confirmCardPayment(basket?.clientSecret,{
      payment_method:{
        card: this.cardNumber,
        billing_details:{
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
        }
      }
    });
  }
  private async createOrder(basket: IBasket | null) {
    const orderToCreate = this.getOrderToCreate(basket as IBasket);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }
  getOrderToCreate(basket: IBasket) {
    return{
      basketId:basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress:this.checkoutForm.get('addressForm').value
    }
  }
}
