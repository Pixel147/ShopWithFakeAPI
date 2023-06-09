import { Component } from '@angular/core';
import {UserService} from "../service/UserService";
import {Router} from "@angular/router";
import {ProductService} from "../service/ProductService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService:UserService,private router:Router,private productService:ProductService) {
    if(!localStorage.getItem('id')){
      this.router.navigate(['']);
    }
    this.userService.getUser().subscribe(
      (next:any)=>{
        this.user = next;
      },
      (error:any)=>{
        console.log(error);
      }
    )
    this.userService.getUserCart().subscribe(
      (next: any) => {
        this.cart = next;
        console.log(this.cart); // Тут ви побачите оновлене значення кошика
        this.getCartProducts(); // Викликаємо після отримання даних кошика
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  productsIds:any;
  user = {
    "address": {
      "geolocation": {
        "lat": "-37.3159",
        "long": "81.1496"
      },
      "city": "kilcoole",
      "street": "Lovers Ln",
      "number": 7267,
      "zipcode": "12926-3874"
    },
    "id": 2,
    "email": "morrison@gmail.com",
    "username": "mor_2314",
    "password": "83r5^_",
    "name": {
      "firstname": "david",
      "lastname": "morrison"
    },
    "phone": "1-570-236-7033",
    "__v": 0
  };
  cart = [
    {
      "id": 3,
      "userId": 2,
      "date": "2020-03-01T00:00:00.000Z",
      "products": [
        {
          "productId": null,
          "quantity": 2
        },
        {
          "productId": null,
          "quantity": 1
        }
      ],
      "__v": 0
    }
  ]
  products = [{
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }]
  cartsAndProducts: any[] = [];

  async getCartProducts() {
    try {
      const productPromises = [];
      for (const cartItem of this.cart) {
        const products = [];
        for (const productItem of cartItem.products) {
          const productId = productItem.productId;
          const productPromise = this.productService.getProductById(productId).toPromise();
          products.push(productPromise.then((product: any) => {
            if (product) {
              return {
                ...product,
                quantity: productItem.quantity,
              };
            } else {
              console.log(`Product with id ${productId} not found.`);
              return null;
            }
          }));
        }
        const resolvedProducts = await Promise.all(products);
        this.cartsAndProducts.push({
          ...cartItem,
          products: resolvedProducts,
        });
      }
      console.log(this.cartsAndProducts);
    } catch (error) {
      console.log('Error retrieving user cart or products:', error);
    }
  }
  clickOnLogout(){
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
