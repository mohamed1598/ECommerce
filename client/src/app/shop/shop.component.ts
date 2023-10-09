import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../models/product';
import { ShopService } from './shop.service';
import { IPagination } from '../models/pagination';
import { IBrand } from '../models/brand';
import { IType } from '../models/productType';
import { ShopParams } from '../models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static:true}) searchTerm:ElementRef|any;
  products:IProduct[]=[];
  brands:IBrand[]=[];
  types:IType[]=[];
  shopParams:ShopParams={
    pageIndex :1,
    pageSize :6,
    brandId:0,
    typeId:0,
    sort:'name',
    search:''
  };
  sortOptions = [
    {name:'Alphbatical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'},
  ];
  totalCount =0;
  constructor(private shopService:ShopService){}
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(
      (response:IPagination|null) =>{
        this.products = response!.data;
        this.shopParams.pageIndex = response!.pageIndex;
        this.shopParams.pageSize = response!.pageSize;
        this.totalCount = response!.count;
      },
      error=>{
        console.log(error)
      }
    )
  }
  getBrands(){
    this.shopService.getBrands().subscribe(
      (response:IBrand[])=> this.brands= [{id:0,name:'all'},...response],
      error=> console.log(error)
    );
  }
  getTypes(){
    this.shopService.getTypes().subscribe(
      (response:IType[])=> this.types= [{id:0,name:'all'},...response],
      error=> console.log(error)
    );
  }
  onBrandSelected(brandId:number){
    this.shopParams.pageIndex = 1;
    this.shopParams.brandId = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId:number){
    this.shopParams.pageIndex = 1;
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  onSortSelected(event:Event){
    this.shopParams.sort = (event.target as HTMLInputElement).value;
    this.getProducts();
  }
  onPageChanged(event:any){
    // this.shopParams.pageIndex = event.page;
    if(this.shopParams.pageIndex !== event){
      this.shopParams.pageIndex = event;
    this.getProducts();
    }
    
  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  OnReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams.search = '';
    this.getProducts();
  }
}

