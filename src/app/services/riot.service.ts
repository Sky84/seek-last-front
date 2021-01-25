import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RiotService {

    constructor(private httpClient: HttpClient) { }

    public getCharacters(gameName: string): Promise<any> {
        return this.httpClient.get('http://localhost:3000/' + gameName + '/characters').toPromise();
    }

}