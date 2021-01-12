import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Player } from '../interfaces/player.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private httpClient: HttpClient) { }

  addPlayer(player: Player): Promise<any> {
    return this.httpClient.post('http://localhost:3000/player', { player }).toPromise();
  }

  getWaitingPlayers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/players');
  }

  removePlayer(player: Player) {
    let httpParams = new HttpParams().set('playerNickname', player.nickname);
    return this.httpClient.delete('http://localhost:3000/player', { params: httpParams }).toPromise();
  }

}
