import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
    this.getUsers();
  }
  users: any = [];
  getUsers() {
    this.http.get('https://fakestoreapi.com/users').subscribe(
      (response: any) => {
        this.users = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  login(username: string, password: string) {
    this.http.post('https://fakestoreapi.com/auth/login', { username: username, password: password }).subscribe(
      (next: any) => {
        localStorage.setItem("token", next.token);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.getUserId(username, password);
  }

  getUserId(username: string, password: string) {
    for (let user of this.users) {
      if (user.username == username && user.password == password) {
        localStorage.setItem("id", user.id.toString());
      }
    }
  }
}
