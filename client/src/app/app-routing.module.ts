import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponentComponent } from './core/test-error-component/test-error-component.component';
import { InternalServerComponent } from './core/errors/internal-server/internal-server.component';
import { NotFountComponent } from './core/errors/not-fount/not-fount.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'',component: HomeComponent , data:{breadcrumb: 'Home'}},
  {path:'shop',loadChildren:()=> import('./shop/shop.module').then(mod =>mod.ShopModule), data:{breadcrumb: 'Shop'}},
  {path:'basket',loadChildren:()=> import('./basket/basket.module').then(mod =>mod.BasketModule), data:{breadcrumb: 'Basket'}},
  {path:'orders',loadChildren:()=> import('./orders/orders.module').then(mod =>mod.OrdersModule), data:{breadcrumb: 'Basket'}},
  {path:'checkout',canActivate:[authGuard],loadChildren:()=> import('./checkout/checkout.module').then(mod =>mod.CheckoutModule), data:{breadcrumb: 'Checkout'}},
  {path:'account',loadChildren:()=> import('./account/account.module').then(mod =>mod.AccountModule), data:{breadcrumb: {skip:true}}},
  {path:'test-error',component: TestErrorComponentComponent, data:{breadcrumb: 'Test Errors'}},
  {path:'server-error',component: InternalServerComponent, data:{breadcrumb: 'Internal Server Error'}},
  {path:'not-found',component: NotFountComponent, data:{breadcrumb: 'Not Found Error'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
