import { Component } from '@angular/core';
import {UserService} from "../service/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService:UserService,private router:Router) {
    this.userService.getUser().subscribe(
      (next:any)=>{
        this.user = next;
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
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
}
