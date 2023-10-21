import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{IDeliveryMethod} from '../models/deliveryMethod'
import { map } from 'rxjs';
import { IOrderToCreate } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  createOrder(order:IOrderToCreate){
    return this.http.post(this.baseUrl+'orders',order);
  }

  getDeliveryMethods(){
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm:any|IDeliveryMethod[])=>{
        return dm.sort((a:any,b:any)=> b.price-a.price)
      })
    )
  }
}
