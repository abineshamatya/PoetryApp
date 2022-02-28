import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MvPoem } from 'src/shared/model/poem.model';
import { CommonService } from 'src/shared/services/common.service';
import { UtilityService } from 'src/shared/services/utility.service';


@Component({
	selector: 'bep-app-poem-detail',
	templateUrl: 'detail.component.html',
	styleUrls: ['./detail.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class DetailComponent implements OnInit {

	disabledBackBtn: boolean;
	@Input() poemModel: MvPoem;
	@Output() backToMainPage: EventEmitter<boolean>;

	constructor(private cs: CommonService, private us: UtilityService) {
		this.poemModel = {} as MvPoem;
		this.backToMainPage = new EventEmitter();
		this.disabledBackBtn = false;
	}

	ngOnInit() {
	}

	backButtonPress(event: Event) {
		this.disabledBackBtn = true;
		event.stopImmediatePropagation();
		event.stopPropagation();
		this.backToMainPage.emit(true);
	}


	addRemovePoemToFavorite(event: Event) {
		//later on call server if required		
		this.poemModel.isFavorite = !this.poemModel.isFavorite;
		this.us.callSnackBar(this.poemModel.isFavorite ? 'Added to favorite list' : 'Removed from favorite list');
		//remove from array if already exists on removing from favorite
		if (this.cs.favoritePoemData.length > 0) {
			var findIdx = this.cs.favoritePoemData.findIndex(x => x.title === this.poemModel.title);
			if (findIdx !== -1 && !this.poemModel.isFavorite) {
				this.cs.favoritePoemData.splice(findIdx, 1);
			}
		}

		//add to favorite list
		if (this.poemModel.isFavorite) {
			this.cs.favoritePoemData.push(this.poemModel);
		}
		//set data for reload or refreshafter adding user we need to show the favorite list of user
		localStorage.setItem('favoriteList', JSON.stringify(this.cs.favoritePoemData));
	}
}