import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/models/basket';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  title = 'Skinet'
  basket$ :Observable<IBasket>;
  currentUser$:Observable<IUser | null>;
  constructor(private basketService:BasketService,private accountService:AccountService){
    this.basket$ = this.basketService.basket$ as Observable<IBasket>;
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit(){

  }

  logout(){
    this.accountService.logout();
  }
}
