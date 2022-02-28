import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MvPoem } from 'src/shared/model/poem.model';
import { CommonService } from 'src/shared/services/common.service';
import { UtilityService } from 'src/shared/services/utility.service';


@Component({
	selector: 'bep-app-poem',
	templateUrl: 'poem.component.html',
	styleUrls: ['./poem.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class PoemComponent implements OnInit {
	sortItems: any[]
	sortPoemSelctedVal: number;
	selectedPoemObj: MvPoem;
	showChildCmp: boolean | false;
	Object = Object;
	constructor(
		public cs: CommonService,
		public us: UtilityService
	) {
		this.showChildCmp = false;
		this.sortItems = [
			{ value: '1', viewValue: 'Title' },
			{ value: '2', viewValue: 'Author' }
		];
		this.sortPoemSelctedVal = this.sortItems[0].value;
		this.selectedPoemObj = {} as MvPoem;
		this.Object = Object;
	}

	ngOnInit() {

	}


	poemCardClick(event: Event, poemModel: MvPoem) {
		event.stopImmediatePropagation();
		event.stopPropagation();
		this.selectedPoemObj = poemModel;
		this.showChildCmp = true;
	}

	sortPoem(event: MatSelectChange) {
		const sort = event.source.triggerValue.toLowerCase() as keyof MvPoem;
		this.cs.randomPoemData = this.cs.randomPoemData.sort((a: MvPoem, b: MvPoem) => (a[sort] > b[sort]) ? 1 : (a[sort] === b[sort]) ? ((a[sort] > b[sort]) ? 1 : -1) : -1);
		if (this.cs.favoritePoemData.length > 0) {
			this.cs.favoritePoemData = this.cs.favoritePoemData.sort((a: MvPoem, b: MvPoem) => (a[sort] > b[sort]) ? 1 : (a[sort] === b[sort]) ? ((a[sort] > b[sort]) ? 1 : -1) : -1);
		}
	}

	enablePoemList(showMainCmp: boolean) {
		this.showChildCmp = !showMainCmp;
	}
}