import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/ProductService";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
  products:any = [{
    id: null,
    title: "",
    price: null,
    description: "",
    category: "",
    image: "",
    rating: {
      rate:null,
      count: null
    }
  }];
  getProductsByCategory(event:any):void{
    this.products = this.productService.getProductsByCategory(event.target.value);
  }
  getSortProducts(event:any):void{
    this.products = this.productService.getProductsBySortType(event.target.value);
  }
}
