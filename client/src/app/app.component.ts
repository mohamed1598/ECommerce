import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { HttpClient } from '@angular/common/http';
import { IPagination } from './models/pagination';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shop';

  constructor(private basketService:BasketService,private accountService:AccountService){

  }
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');     
     if(basketId){
      this.basketService.getBasket(basketId).subscribe({next:()=>{
        console.log('basket intialised');
      },error:error=>{
        console.log(error);
      }});
     }
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
      this.accountService.loadCurrentUser(token)!.subscribe({
        next: ()=>console.log("loaded user",),
        error: error => console.log(error)
      });
  }

}
