import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService{
  constructor(private http:HttpClient) {
  }

  getProducts(){
    return this.http.get('https://fakestoreapi.com/products');
  }
  getProductById(id:any){
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }
  getProductsByCategory(category:string){
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`);
  }
  getProductsBySortType(type:string){
    return this.http.get(`https://fakestoreapi.com/products?sort=${type}`);
  }
  createCart(userId:any,date:any,products:any){
    return this.http.post(`https://fakestoreapi.com/carts`,{userId:userId,date:date,products:products});
  }
}
