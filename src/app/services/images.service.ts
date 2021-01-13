import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {


    constructor() { }

    public getRankImageUrl(rankId: string): string {
        return '../assets/images/ranks/skillgroup' + rankId + '.png';
    }

    public getLanguageImage(languageId: string): string {
        return 'https://www.countryflags.io/' + languageId + '/flat/32.png';
    }
}