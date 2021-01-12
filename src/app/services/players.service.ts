import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Player } from '../interfaces/player.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersCount: number = 0;

  constructor(private httpClient: HttpClient) { }

  addPlayer(player: Player): Promise<any> {
    return this.httpClient.post('http://localhost:3000/player', { player }).toPromise();
  }

  getWaitingPlayers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/players').pipe(map((players: any) => {
      this.playersCount = players.length;
      return players;
    }));
  }

  removePlayer(player: Player) {
    let httpParams = new HttpParams().set('playerNickname', player.nickname);
    return this.httpClient.delete('http://localhost:3000/player', { params: httpParams }).toPromise();
  }

  public get PlayersCount(): number {
    return this.playersCount;
  }

}
