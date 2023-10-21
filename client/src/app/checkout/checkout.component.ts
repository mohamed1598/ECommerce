import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  checkoutForm:FormGroup = this.createCheckoutForm();
  constructor(private fb :FormBuilder,private accountService:AccountService) {
    this.getAddressFormValues();
  }
  createCheckoutForm(): FormGroup{
    return this.fb.group({
      addressForm:this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm:this.fb.group({
        deliveryMethod:[null,Validators.required]
      }),
      paymentForm:this.fb.group({
        nameOnCard:[null,Validators.required]
      })
    })
  }

  getAddressFormValues(){
    this.accountService.getUserAddress().subscribe(address =>{
      console.log(address);
      
      if(address){
        this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    },error=>{
      console.log(error);
      
    })
  }
}
