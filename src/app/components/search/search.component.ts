import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router){}

  doSearch(value: string){
    console.log(`doSearch value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
