import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService{
  constructor(private http:HttpClient) {
  }

  getProducts(){
    return this.http.get('https://fakestoreapi.com/products');
  }
  getProductsByCategory(category:string){
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`);
  }
  getProductsBySortType(type:string){
    return this.http.get(`https://fakestoreapi.com/products?sort=${type}`);
  }
}
