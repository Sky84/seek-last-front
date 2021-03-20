import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  public players: Player[] = [];

  constructor(private socket: Socket) {
    this.socket.fromOneTimeEvent<Player[]>('get_players').then((players: Player[]) => {
      this.players = players;
    });
    this.socket.fromEvent<Player>('new_player_connected').subscribe((player: Player) => {
      this.players.push(player);
    });
    this.socket.fromEvent<Player>('player_disconnected').subscribe((player: Player) => {
      const players = this.players;
      for (let i = 0; i < players.length; i++) {
        const _player = players[i];
        if (_player.socketId === player.socketId) {
          this.players.splice(this.players.indexOf(_player), 1);
          break;
        }
      }
    });
  }

  public initPlayerListService(): void {
    this.socket.emit('get_players_init');
  }

  addPlayer(player: Player): void {
    this.socket.emit('add_new_player', player);
  }

  public get PlayersCount(): number {
    return this.players.length;
  }

}
