import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentPlayerService } from './current-player.service';
import { GameType, Player } from '../interfaces/player.interface';


@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    public players: any = {};
    public gameType: GameType = GameType.CSGO;

    constructor(private socket: Socket, private snackBarService: MatSnackBar, private currentPlayerService: CurrentPlayerService) {
        this.socket.fromOneTimeEvent<Player[]>('get_players').then((players: Player[]) => {
            this.players[this.gameType] = players;
        });
        this.socket.fromEvent<Player>('new_player_connected').subscribe((player: Player) => {
            this.players[player.gameType].push(player);
        });
        this.socket.fromEvent<Player>('player_disconnected').subscribe((player: Player) => {
            const players = this.players[player.gameType];
            for (let i = 0; i < players.length; i++) {
                const _player = players[i];
                if (_player.socketId === player.socketId) {
                    this.players[_player.gameType].splice(this.players[_player.gameType].indexOf(_player), 1);
                    break;
                }
            }
        });
    }

    public initPlayerListService(gameType: GameType): void {
        this.gameType = gameType;
        if (!this.players[this.gameType]) {
            this.players[gameType] = [];
        }
        this.socket.emit('get_players_init');
    }

    addPlayer(player: Player): void {
        this.socket.emit('add_new_player', player);

        if (player.nickname!.length === 0 || player.language_id!.length === 0) {
            return;
        }
        this.snackBarService.open('Player successfully added! Please wait a few sec before refreshed list.', undefined, {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
        this.currentPlayerService.saveCurrentPlayer(player);
    }

    public get PlayersCount(): number {
        let count = 0;
        for (const gamePlayers in this.players) {
            count += this.players[gamePlayers].length;
        }
        return count;
    }

}
