import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/pagination';
import { IType } from '../models/productType';
import { IBrand } from '../models/brand';
import { map } from 'rxjs';
import { ShopParams } from '../models/shopParams';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  basUrl = 'http://localhost:5156/api/'
  constructor(private http:HttpClient) { }
  
  getProducts(shopParams:ShopParams){
    let params = new HttpParams();
    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }
    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }
    if(shopParams.sort){
      params = params.append('sort',shopParams.sort);
    }
    if(shopParams.pageIndex){
      params = params.append('pageIndex',shopParams.pageIndex);
    }
    if(shopParams.pageSize){
      params = params.append('pageSize',shopParams.pageSize);
    }
    if(shopParams.search != ''){
      params = params.append('search',shopParams.search);

    }
    return this.http.get<IPagination>(this.basUrl+'products',{observe:'response',params:params})
    .pipe(map(response =>{
      return response.body;
    }));
  }
  getProduct(id:number){
    return this.http.get<IProduct>(this.basUrl+'products/'+id)
  }
  getTypes(){
    return this.http.get<IType[]>(this.basUrl+'products/types');
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.basUrl+'products/brands');
  }
}
