import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../interfaces/Player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private httpClient: HttpClient) { }

  addPlayer(player: Player): Promise<any> {

    return this.httpClient.post('http://localhost:3000/player', { player }).toPromise();
  }

}
