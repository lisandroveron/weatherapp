import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
	@Input() timepoint:string;
	@Input() temp:string;
	@Input() weather:string;

	constructor(){
	};

	ngOnInit(): void {
	};
};