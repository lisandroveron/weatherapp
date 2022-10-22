import { Component, OnInit } from '@angular/core';
import { StoreService } from "./services/store.service";
import * as countriesJSON from "../assets/text/countries.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Data object from API.
	data:any;
	// Countries data from local JSON.
	countries:any = (countriesJSON as any).default;
	// Formatted hour for pass to Card component.
	hour:number;
	// Background image URL for App.
	background:string;
	loading:string;
	// Parameters for new API calls after the user select a new location.
	country:string = "Buenos Aires";
	lon:number = -58.3;
	lat:number = -34.8;

	constructor(public store: StoreService){
		this.setData();
	};
	
	setData(){
		this.store.getData(this.lon, this.lat).subscribe((data:any) => {
			console.log(data.dataseries[0].prec_amount);
			this.data = data;
			this.setInfo();
			this.isLoading("Off");
		});
	};

	// This function is to format info getted from API.
	private setInfo(){
		// Setting 'hour' variable as index based in current hour. It will be used to select the apropiate 'data.dataseries[hour]' property.
		let currentDate:Date = new Date();
		switch(currentDate.getHours()){
			case 23:
			case 0:
			case 1: this.hour = 7; break;
			case 2:
			case 3:
			case 4: this.hour = 0; break;
			case 5:
			case 6:
			case 7: this.hour = 1; break;
			case 8:
			case 9:
			case 10: this.hour = 2; break;
			case 11:
			case 12:
			case 13: this.hour = 3; break;
			case 14:
			case 15:
			case 16: this.hour = 4; break;
			case 17:
			case 18:
			case 19: this.hour = 5; break;
			case 20:
			case 21:
			case 22: this.hour = 6; break;
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
						case 7: this.data.dataseries[i].weather = "../assets/icons/cloudy.svg"; break;
						case 8:
						case 9: this.data.dataseries[i].weather = "../assets/icons/rainynight.svg"; break;
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
						case 7: this.data.dataseries[i].weather = "../assets/icons/cloudy.svg"; break;
						case 8:
						case 9: this.data.dataseries[i].weather = "../assets/icons/rainyday.svg"; break;
					};
				};
			}else{
				// Rain
				if(this.data.dataseries[i].timepoint < 6 || this.data.dataseries[i].timepoint >= 18){
					this.data.dataseries[i].weather = "assets/icons/rainynight2.svg";
				}else{
					this.data.dataseries[i].weather = "assets/icons/rainyday2.svg";
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
			// Setting pressure
			if(this.data.dataseries[i].msl_pressure == -9999){
				this.data.dataseries[i].msl_pressure = "No data";
			}else{
				this.data.dataseries[i].msl_pressure = `${this.data.dataseries[i].msl_pressure} Pa`;
			};
		};
	};

	setCountry(e:any){
		this.isLoading("On");
		this.country = this.countries[e.target.value].name;
		this.lat = this.countries[e.target.value].latitude;
		this.lon = this.countries[e.target.value].longitude;
		this.setData();
	};

	isLoading(turn:string){
		switch(turn){
			case "On": this.loading = "animation-name: loadingAppear;"; break;
			case "Off": this.loading = "animation-name: loadingDisappear;"; break;
			default: break;
		};
	};
};

// For deployment, change the '../assets' paths in:
// 1- './src/app/app.component.html'
// 2- './src/app/app.component.ts'