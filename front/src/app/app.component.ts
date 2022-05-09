import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pfe-chaima';
  features: object | undefined ;
  constructor(private articlesService:ArticlesService) { }
  loader:any

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
