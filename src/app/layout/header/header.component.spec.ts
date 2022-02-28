import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';


describe('a header component', () => {
	let component: HeaderComponent;

	TestBed.configureTestingModule({
		declarations: [
		],
		schemas: [
			NO_ERRORS_SCHEMA
		]
	}).compileComponents();

	// instantiation through framework injection
	beforeEach(inject([HeaderComponent], (HeaderComponent: HeaderComponent) => {
		component = HeaderComponent;
	}));

});