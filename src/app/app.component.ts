import { Component, OnInit } from '@angular/core';
import { StoreService } from "./services/store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	data:any;

	constructor(public store: StoreService){
		store.getData().subscribe((data:any) => this.data = data);
	};
	
};