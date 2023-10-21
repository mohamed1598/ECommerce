import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/Interceptors/error.interceptor';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/Interceptors/loading.interceptor';
import { JwtInterceptor } from './core/Interceptors/jwt-interceptor';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    CoreModule,
    ShopModule,
    HomeModule,
    OrdersModule,
    PaginationModule.forRoot(),
    NgxSpinnerModule.forRoot({type:'ball-scale-multiple'})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
