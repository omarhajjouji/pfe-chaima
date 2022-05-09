import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ArticlesService {
  api_url = "http://localhost:5000"
  constructor(private httpClient:HttpClient) { }

  getFeatures(molucule:string):Observable<Object>{
    const params = new HttpParams().set("molucule",molucule)
    return this.httpClient.get(this.api_url+"/get_keys",{params})
  }

}
