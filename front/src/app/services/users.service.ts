import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api_url = "http://localhost:5000"
  constructor(private httpClient:HttpClient) { }


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


}
