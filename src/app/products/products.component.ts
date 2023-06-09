import {Component} from '@angular/core';
import {ProductService} from "../service/ProductService";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
    if(localStorage.getItem("id")){
      this.isVisible = true;
    }
  }
  isVisible = false;
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
  selectedProduct = {
    id: null,
    title: "",
    price: null,
    description: "",
    category: "",
    image: "",
    rating: {
      rate:1,
      count: 1
    }
  }
  addCartProducts:any = [];
  quantity:any;
  cartProducts:any = {
    "id": null,
    "userId": null,
    "date": null,
    "products": [
      {
        "productId": null,
        "quantity": null
      },
      {
        "productId": null,
        "quantity": null
      }
    ]
  };
  selectProduct(event:any){
    this.productService.getProductById(event.target.id).subscribe(
      (data:any)=>{
        this.selectedProduct = data;
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  addToCart(){
    const product = {idProduct:this.selectedProduct.id,quantity:this.quantity};
    this.addCartProducts.push(product);
    this.quantity = 1;
  }
  createCart(){
    this.productService.createCart(localStorage.getItem("id"),new Date(),this.addCartProducts).subscribe(
      (data:any)=>{
        this.cartProducts = data;
      },
      (error:any)=>{
        console.log(error);
      }
    )
    console.log(this.cartProducts);
  }
  getProductsByCategory(event:any):void{
    this.products = this.productService.getProductsByCategory(event.target.value);
  }
  getSortProducts(event:any):void{
    this.products = this.productService.getProductsBySortType(event.target.value);
  }
}
