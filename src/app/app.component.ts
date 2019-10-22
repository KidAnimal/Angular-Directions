import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from
  'rxjs/operators';

import { AppService } from '../app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {

  data: any;
  private searchTerms: Subject<string>;
  private destSearch: Subject<string>;
  origin: string;
  destination: string;
  constructor(private appService: AppService) {
    this.origin = "Boston, MA";
    this.destination = "New York, NY";
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getDirections() {
    this.appService.getDirections(this.origin, this.destination).pipe(debounceTime(10000), distinctUntilChanged()).subscribe(data => {
      this.data = data.json();
    })
  }

  onOriginChange(data){
    this.searchTerms.next(data);
  }
  onDestinationChange(data){
    this.destSearch.next(data);
  }

  ngOnInit() {

    this.getDirections();

    this.searchTerms = new Subject<string>();
    this.destSearch = new Subject<string>();
    this.searchTerms.pipe(debounceTime(2000),distinctUntilChanged()).subscribe((val)=>{this.origin = val;
      this.getDirections();});

    
    this.destSearch.pipe(debounceTime(2000),distinctUntilChanged()).subscribe((val)=>{this.destination = val;
      this.getDirections();});
    
  }
}
