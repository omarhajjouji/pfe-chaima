import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent implements OnInit {
  @Output() searchSubmitted: EventEmitter<string> =   new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  search(form:any){
    this.searchSubmitted.emit(form.molucule);
  }
}
