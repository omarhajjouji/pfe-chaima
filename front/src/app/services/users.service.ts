import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api_url = "http://localhost:5000"
  constructor(private httpClient:HttpClient,private cookieService:CookieService,private router:Router) { }


  getUsers():Observable<any>{
    return this.httpClient.get(this.api_url+"/users")
  }

  createUser(user:any):Observable<any>{
    return this.httpClient.post(this.api_url+"/users",user)
  }

  deleteUser(email:any):Observable<any>{
    const params = new HttpParams().set("email",email)
    return this.httpClient.delete(this.api_url+"/users",{params})
  }

  logout(){
    this.cookieService.delete("role");
    this.cookieService.delete("username");
    this.router.navigate(["/"])
  }


}
