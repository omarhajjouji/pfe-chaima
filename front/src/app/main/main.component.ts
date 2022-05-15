import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  title = 'pfe-chaima';
  features: object | undefined ;
  loader:any;

  constructor(private articlesService:ArticlesService) { }
  

  ngOnInit(): void {
  }

  get_features(molucule:string){
    this.loader = document.getElementById("loader")
    this.loader.style.display="block"
    this.articlesService.getFeatures(molucule).subscribe((res)=>{
      this.features = res;
      this.loader.style.display="none"
      document.getElementById("search-form")?.classList.add("got-result");
    })
  }
}
