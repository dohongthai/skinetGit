import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopsService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
@ViewChild('search', {static:false}) searchTerm: ElementRef;

  products: IProduct[];
brands: IBrand[];
types: IType[];
shopParams= new ShopParams();
totalCount: number;
sortOptions = [
  {name: 'A-Z', value:'name'},
  { name:'Giá: Thấp đến Cao' , value:'priceAsc'},
  {name: ' Giá: Cao đến Thấp', value: 'priceDesc'}
];


  constructor(private shopService:ShopsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }

  getProducts () {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products=response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
      this.totalCount =response.count;
    }, error => {
      console.log(error);
    });
    
  }


  getBrands () {
    this.shopService.getBrands().subscribe(response => {
      this.brands=[{id:0, name: 'Tất cả'},...response];
    }, error => {
      console.log(error);
    });
  }


  getTypes () {
    this.shopService.getTypes().subscribe(response => {
      this.types=[{id:0, name: 'Tất cả'},...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected (brandId:number)
  {
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

onTypeSelected (typeId:number)
  {
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }


  onSortSelected(sort: string)
  {
    this.shopParams.sort=sort;
    this.getProducts();
  } // phana loaijp


onPageChanged (event: any)
{
  if(this.shopParams.pageNumber!==event)
  {this.shopParams.pageNumber=event;
    this.getProducts();
  }
  
}
onSearch( ) {
  this.shopParams.search =this.searchTerm.nativeElement.value;
  this.shopParams.pageNumber=1;
  this.getProducts();
}

onReset()
{
  this.searchTerm.nativeElement.value= '';
  this.shopParams=new ShopParams();
  this.getProducts();
}
}

