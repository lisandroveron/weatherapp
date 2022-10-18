import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(){
		fetch("https://www.7timer.info/bin/api.pl?lon=-58.3&lat=-34.8&product=civil&output=json")
		.then(response => response.json())
		.then(api => api = api.dataseries);
	};
};