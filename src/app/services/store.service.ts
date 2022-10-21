import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	lat:number = -34.8;
	lon:number = -58.3;

	constructor(public http:HttpClient){
	};

	getData(){
		return this.http.get(`https://www.7timer.info/bin/api.pl?lon=${this.lon}&lat=${this.lat}&product=meteo&output=json`);
	};

};