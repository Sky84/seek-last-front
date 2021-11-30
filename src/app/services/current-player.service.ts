import { Injectable } from '@angular/core';
import { GameType, Player } from '../interfaces/player.interface';

@Injectable({
    providedIn: 'root'
})
export class CurrentPlayerService {

    constructor() {
        const localKeys = Object.entries(GameType).map((gameType) => 'currentPlayer_' + gameType[1]);
        localKeys.forEach(key => {
            localStorage.removeItem(key);
        });
    }

    public getCurrentPlayer(gameType: GameType): Player {
        const currentPlayer = localStorage.getItem("currentPlayer_" + gameType) || '{}';
        return JSON.parse(currentPlayer);
    }

    public saveCurrentPlayer(player: Player) {
        localStorage.setItem('currentPlayer_' + player.gameType, JSON.stringify(player));
    }
}
