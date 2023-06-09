import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router:Router) {
  }
  clickOnProfile() {
    const id = localStorage.getItem('id');
    if (id) {
      this.router.navigate(['profile'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
