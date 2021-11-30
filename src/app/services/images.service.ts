import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {


    constructor() { }

    public getRankImageUrl(rankType: string, rankId: string): string {
        return '../assets/images/ranks/' + rankType + '/skillgroup' + rankId + '.png';
    }

    public getLanguageImage(languageId: string): string {
        return 'https://flagcdn.com/w40/' + languageId + '.png';
    }
}