import { Component, OnInit } from '@angular/core';
import { StoreService } from "./services/store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	data:any;
	hour:number;
	background:string;

	constructor(public store: StoreService){
		store.getData().subscribe((data:any) => {
			this.data = data;
			this.setInfo();
		});
	};
	
	// This function is to format info getted by the API
	private setInfo(){
		// Setting 'hour' variable as index based in current hour. It will be used to select the apropiate 'data.dataseries[hour]' property. Note: The default statement was assigned because at 00 hs, 'this.hour' gets undefined instead '7' (must be fixed. Maybe order of '0' and '1' matters).
		let currentDate:Date = new Date();
		switch(currentDate.getHours()){
			case (2 || 3 || 4): this.hour = 0; break;
			case (5 || 6 || 7): this.hour = 1; break;
			case (8 || 9 || 10): this.hour = 2; break;
			case (11 || 12 || 13): this.hour = 3; break;
			case (14 || 15 || 16): this.hour = 4; break;
			case (17 || 18 || 19): this.hour = 5; break;
			case (20 || 21 || 22): this.hour = 6; break;
			case (23 || 0 || 1): this.hour = 7; break;
			default: this.hour = 7; break;
		};
		// Setting background path for background image in the app
		if(currentDate.getHours() >= 4 && currentDate.getHours() < 13){
			this.background = "background-image: url('../assets/img/morning1.jpg');";
		}else if(currentDate.getHours() >= 13 && currentDate.getHours() < 21){
			this.background = "background-image: url('../assets/img/sunset.jpg');";
		}else if(currentDate.getHours() >= 21 || currentDate.getHours() < 4){
			this.background = "background-image: url('../assets/img/night.jpeg');";
		};

		let dataLength:number = this.data.dataseries.length;
		let j:number = 0;
		for(let i = 0; i < dataLength; i++){
			// Setting snow depth
			switch(this.data.dataseries[i].snow_depth){
				case 0: this.data.dataseries[i].snow_depth = "0"; break;
				case 1: this.data.dataseries[i].snow_depth = "0-1"; break;
				case 2: this.data.dataseries[i].snow_depth = "1-5"; break;
				case 3: this.data.dataseries[i].snow_depth = "5-10"; break;
				case 4: this.data.dataseries[i].snow_depth = "10-25"; break;
				case 5: this.data.dataseries[i].snow_depth = "25-50"; break;
				case 6: this.data.dataseries[i].snow_depth = "50-100"; break;
				case 7: this.data.dataseries[i].snow_depth = "100-150"; break;
				case 8: this.data.dataseries[i].snow_depth = "150-250"; break;
				case 9: this.data.dataseries[i].snow_depth = "250+"; break;
			};
			// Setting icon URL
			if(this.data.dataseries[i].prec_amount < 4){
				if(this.data.dataseries[i].timepoint <= 6 || this.data.dataseries[i].timepoint >= 18){
					// Night
					switch(this.data.dataseries[i].cloudcover){
						case 1:
						case 2: this.data.dataseries[i].weather = "../assets/icons/moon.svg"; break;
						case 3:
						case 4:
						case 5: this.data.dataseries[i].weather = "../assets/icons/partialmoon.svg"; break;
						case 6:
						case 7: this.data.dataseries[i].weather = "../assets/icons/cloud.svg"; break;
						case 8:
						case 9: this.data.dataseries[i].weather = "../assets/icons/cloudy.svg"; break;
					};
				}else if(this.data.dataseries[i].timepoint > 6 || this.data.dataseries[i].timepoint < 18){
					// Day
					switch(this.data.dataseries[i].cloudcover){
						case 1:
						case 2: this.data.dataseries[i].weather = "../assets/icons/sun.svg"; break;
						case 3:
						case 4:
						case 5: this.data.dataseries[i].weather = "../assets/icons/partialsun.svg"; break;
						case 6:
						case 7: this.data.dataseries[i].weather = "../assets/icons/cloud.svg"; break;
						case 8:
						case 9: this.data.dataseries[i].weather = "../assets/icons/cloudy.svg"; break;
					};
				};
			}else{
				// Rain
				switch(this.data.dataseries[i].timepoint){
					case (this.data.dataseries[i].timepoint <= 6 || this.data.dataseries[i].timepoint >= 18): this.data.dataseries[i].weather = "../assets/icons/rainynight.svg"; break;
					case (this.data.dataseries[i].timepoint > 6 || this.data.dataseries[i].timepoint < 18): this.data.dataseries[i].weather = "../assets/icons/rainyday.svg"; break;
				};
			};
			// Setting hour
			switch(j){
				case 0: this.data.dataseries[i].timepoint = "03:00"; break;
				case 1: this.data.dataseries[i].timepoint = "06:00"; break;
				case 2: this.data.dataseries[i].timepoint = "09:00"; break;
				case 3: this.data.dataseries[i].timepoint = "12:00"; break;
				case 4: this.data.dataseries[i].timepoint = "15:00"; break;
				case 5: this.data.dataseries[i].timepoint = "18:00"; break;
				case 6: this.data.dataseries[i].timepoint = "21:00"; break;
				case 7: this.data.dataseries[i].timepoint = "24:00"; break;
			};
			j++;
			if(j === 8){
				j = 0;
			};
		};
	};
};

// For deployment, change the paths in:
// 1- './src/app/app.component.html'
// 2- './src/app/app.component.ts'