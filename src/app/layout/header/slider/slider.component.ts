import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';
import { CommonService } from 'src/shared/services/common.service';

@Component({
	selector: 'bep-slider',
	templateUrl: 'slider.component.html',
	styleUrls: ['./slider.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class SliderComponent implements OnInit {
	JSON: JSON;
	topPoemsSliderOptions: OwlOptions;
	@ViewChild('poemCarousel', { static: true }) poemSliderCmp: CarouselComponent | undefined;

	constructor(public cs: CommonService) {
		this.JSON = JSON;
		this.topPoemsSliderOptions = {
			loop: true,
			margin: 25,
			autoplay: true,
			autoplayHoverPause: true,
			mouseDrag: true,
			touchDrag: true,
			pullDrag: true,
			dots: true,
			navSpeed: 800,
			stagePadding: 0,
			items: 1,
			// autoHeight: true,
			// autoWidth: true,
			// navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
			navText: ['<span>&#8249;</span>', '<span>&#8250;</span>'],
			responsive: {
				0: {
					items: 1,
					slideBy: 1,
				},
				400: {
					items: 1,
					slideBy: 1,
				},
				768: {
					items: 1,
					slideBy: 1,
				},
				992: {
					items: 1,
					slideBy: 1,
				},
				1200: {
					items: 1,
					slideBy: 1,
				},
			},
			nav: true
		}
	}

	ngOnInit() {

	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		if (this.poemSliderCmp !== undefined) {
			let anyService = this.poemSliderCmp as any;
			let carouselService = anyService.carouselService as CarouselService;
			carouselService.refresh();
			carouselService.update();
			carouselService.onResize(event.target.innerWidth);
		}
	}
}