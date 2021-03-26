import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rank } from '../../interfaces/rank.interface';
import { FormControl, Validators } from '@angular/forms';
import { CSGORankEnum } from '../../enums/csgorank.enum';
import { ChatService } from '../../services/chat.service';
import { PayloadFromEvent } from 'src/app/interfaces/payload.interface';
import { GameType, Player } from 'src/app/interfaces/player.interface';
import { CurrentPlayerService } from 'src/app/services/current-player.service';

@Component({
    selector: 'app-csgo',
    templateUrl: './csgo.component.html',
    styleUrls: ['./csgo.component.scss'],
    animations: [
        trigger('playerForm', [
            transition(':leave', [
                style({ transform: 'translate(0,0)', opacity: 1 }),  // initial
                animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({ transform: 'translate(0, -100%)', opacity: 0 }))  // final
            ])
        ])
    ]
})
export class CsgoComponent implements OnInit {
    public playerNicknameFormControl: FormControl = new FormControl('', Validators.required);

    public playerNickname: FormControl = new FormControl("");
    public playerLanguageId: FormControl = new FormControl("");
    public playerRankId: FormControl = new FormControl("");

    public languages = ['us'];
    public ranks: Rank[] = [];

    public contactPlayers: Player[] = [];

    constructor(private playersService: PlayersService, private chatService: ChatService, private snackBarService: MatSnackBar, private currentPlayerService: CurrentPlayerService) { }

    ngOnInit(): void {
        const language = window.navigator.language.split("-")[0];
        this.languages.push(language);

        const ranksEntries = Object.entries(CSGORankEnum).filter(e => !isNaN(parseInt(e[0])));
        this.ranks = ranksEntries.map((rank: any[]) => {
            return ({ id: (parseInt(rank[0]) + 1).toString(), name: rank[1] });
        });
        this.playersService.initPlayerListService(GameType.CSGO);
        this.chatService.handleMessages().subscribe(({ message, from }: PayloadFromEvent) => {
            const contactPlayer: Player = { socketId: from, nickname: message.author, gameType: this.playersService.gameType };
            if (!this.contactPlayers.find(() => contactPlayer.socketId)) {
                this.contactPlayers.push(contactPlayer);
            }
        });
    }

    public get players() {
        return this.playersService.players[this.playersService.gameType];
    }

    public onPlayerClick(player: Player) {
        if (this.CurrentPlayer && player.nickname === this.CurrentPlayer.nickname) {
            this.snackBarService.open('You cannot contact yourself.', undefined, {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        }
        else if (!!this.contactPlayers.find((p) => p.socketId === player.socketId)) {
            this.snackBarService.open('Chat for this player is already open.', undefined, {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        } else {
            this.contactPlayers.unshift(player);
        }
    }

    public addPlayer() {
        const player: Player = {
            nickname: this.playerNickname.value,
            language_id: this.playerLanguageId.value,
            rank_id: this.playerRankId.value,
            gameType: this.playersService.gameType
        };
        this.playersService.addPlayer(player);
    }

    public get CurrentPlayer() {
        return this.currentPlayerService.getCurrentPlayer(this.playersService.gameType);
    }
}
