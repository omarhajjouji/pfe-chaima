import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.css']
})
export class FeaturesListComponent implements OnInit {
  @Input()
  features :object | undefined;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.features)
  }

}
