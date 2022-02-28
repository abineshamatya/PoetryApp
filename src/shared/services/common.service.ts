import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MvPoem } from 'src/shared/model/poem.model';
import { WebApiService } from './web-api.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    poemSliderData: MvPoem[];
    randomPoemData: MvPoem[];
    favoritePoemData: Array<MvPoem>;

    constructor(private api: WebApiService) {
        this.poemSliderData = [];
        this.randomPoemData = [];
        this.favoritePoemData = [];
    }

    getPoem(take: number, lineCount: number) {
        return this.api.get('poemcount,linecount/' + take + ';' + lineCount);
    }

    getRandomPoem(radomPoemCount: number): Observable<any> {
        return this.api.get('random/' + radomPoemCount);
    }
}