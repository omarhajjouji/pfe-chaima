import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import {CookieService} from 'ngx-cookie-service';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  title = 'pfe-chaima';
  features: object | undefined ;
  loader:any;
  isAdmin:boolean | undefined;

  constructor(private articlesService:ArticlesService,private cookieService:CookieService,private userService:UsersService) { }
  

  ngOnInit(): void {
    this.isAdmin = this.cookieService.get("role")=="admin";
  }

  get_features(molucule:string){
    this.loader = document.getElementById("loader")
    this.loader.style.display="block"
    document.getElementById("submit")?.classList.add("d-none");
    document.getElementById("error-message")?.classList.add("d-none");
    document.getElementById("features-list")?.classList.add("d-none");
    document.getElementById("document-actions")?.classList.add("d-none");
    

    this.articlesService.getFeatures(molucule).subscribe((res)=>{
      this.features = res;
      this.loader.style.display="none"
      document.getElementById("search-form")?.classList.add("got-result");
      document.getElementById("document-actions")?.classList.remove("d-none");
      document.getElementById("error-message")?.classList.add("d-none");
      document.getElementById("features-list")?.classList.remove("d-none");
    },(err)=>{
      this.loader.style.display="none"
      document.getElementById("submit")?.classList.remove("d-none");
      document.getElementById("error-message")?.classList.remove("d-none");
    })
  }

  logout(){
    this.userService.logout();
  }
}
