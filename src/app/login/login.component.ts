import { Component } from '@angular/core';
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService,private router:Router) {
  }
  username:any;
  password:any;
  displayErrorLogin = false;
  login(){
    this.authService.login(this.username,this.password);
    if(!localStorage.getItem('id')){
      this.displayErrorLogin = true;
    }
    else{
      this.router.navigate(['/profile'])
    }
  }
}
