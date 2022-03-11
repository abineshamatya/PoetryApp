import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MvPoem } from 'src/shared/model/poem.model';
import { CommonService } from 'src/shared/services/common.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
	selector: 'bep-app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
	private _unsubscribeAll: Subject<any>;
	showLoading: boolean;
	showSlider: boolean;
	take: number;
	poemCount: number;
	lineCount: number;

	constructor(
		public cs: CommonService,
		public us: UtilityService) {
		this._unsubscribeAll = new Subject();
		this.showLoading = false;
		this.showSlider = false;
		this.take = 15;
		this.poemCount = 20;
		this.lineCount = 6;

	}

	ngOnInit() {
		//intialize poem for carousel
		this.fetchPoem();

		//intialize favorite Poems If saved by the user
		this.initializeFavoriteList();
	}

	initializeFavoriteList() {
		let favoritePoemData: MvPoem[] = JSON.parse(localStorage.getItem('favoriteList') || '[]');
		if (favoritePoemData.length > 0) {
			this.cs.favoritePoemData = favoritePoemData;
		}
	}

	fetchPoem() {
		if (this.cs.poemSliderData.length === 0) {
			this.cs.getPoem(this.take, this.lineCount)
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((response: any) => {
					this.cs.poemSliderData = response;
				});
		}
	}

	fetchRandomPoem(event: Event) {
		event.stopPropagation();
		this.showLoading = !this.showLoading;
		this.cs.getRandomPoem(this.poemCount)
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe({
				next: (response) => {
					if ("ok" in response && !response.ok) {
						return;
					}
					if (response) {

						this.showSlider = true;
						let $this = this;
						response.map(function (x: MvPoem) {
							x.cardColor = $this.us.getRandomColor();
							x.avatarName = $this.us.getPersonInitialName(x.author);
							x.isFavorite = false;
						});
						const sort = "title" as keyof MvPoem;
						response.sort((a: MvPoem, b: MvPoem) => (a[sort] > b[sort]) ? 1 : (a[sort] === b[sort]) ? ((a[sort] > b[sort]) ? 1 : -1) : -1);
						this.cs.randomPoemData = response;

						this.scrollToRecentPoems('poem-wrap');
					}
				},
				complete: () => {
					this.showLoading = !this.showLoading;
				}
			});
	}

	scrollToRecentPoems(selector: string) {
		let element = document.getElementById(selector);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
			return;
		}
		let observer = new MutationObserver(mutations => {
			mutations.forEach(function (mutation) {
				let nodes = Array.from(mutation.addedNodes);
				for (var node of nodes) {
					if (node.contains(document.getElementById(selector))) {
						element = document.getElementById(selector);
						if (element) {
							element.scrollIntoView({
								behavior: 'smooth',
								block: 'start',
								inline: 'nearest'
							});
						}
						observer.disconnect();
						return;
					}
				}
			});
		});
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
	}

	ngOnDestroy() {
		this._unsubscribeAll.next(null);
		this._unsubscribeAll.complete();
	}
}