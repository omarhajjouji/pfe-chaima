import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = "http://localhost:5000"
  constructor(private httpClient:HttpClient) { }

  login(cred:any):Observable<any>{
    return this.httpClient.post(this.api_url+"/login",cred)
  }

}
