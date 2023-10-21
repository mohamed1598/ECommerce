import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order:IOrder|any;

  constructor(private route:ActivatedRoute,private breadcrumbService:BreadcrumbService,private orderService:OrdersService){
    this.breadcrumbService.set('@OrderDetailed','');
  }
  
  ngOnInit(): void {
    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id')!)
    .subscribe({
      next:(order:IOrder|any)=>{
        this.order = order;
        this.breadcrumbService.set('@orderDetailed',`Order # ${order.id} - ${order.status}`);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

}
