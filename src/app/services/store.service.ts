import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	constructor(public http:HttpClient){
	};

	getData(lon:number, lat:number){
		return this.http.get(`https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=meteo&output=json`);
	};
};