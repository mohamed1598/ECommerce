import { Component, OnInit } from '@angular/core';
import { IOrder } from '../models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export default class OrdersComponent implements OnInit {
  orders:IOrder[]=[]
  constructor(private orderService:OrdersService){

  }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderService.getOrdersForUser().subscribe({next:(orders:IOrder[]|any)=>{
      this.orders = orders;
    },error: error=>console.log(error)}
    )
  }

}
