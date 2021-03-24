import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rank } from '../../interfaces/rank.interface';
import { FormControl, Validators } from '@angular/forms';
import { CSGORankEnum } from '../../enums/csgorank.enum';
import { ChatService } from '../../services/chat.service';
import { PayloadFromEvent } from 'src/app/interfaces/payload.interface';
import { Player } from 'src/app/interfaces/player.interface';

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

    public currentPlayer: any;

    public languages = ['us'];
    public ranks: Rank[] = [];

    public contactPlayers: Player[] = [];

    constructor(private playersService: PlayersService, private chatService: ChatService, private snackBarService: MatSnackBar) { }

    ngOnInit(): void {
        const language = window.navigator.language.split("-")[0];
        this.languages.push(language);

        const ranksEntries = Object.entries(CSGORankEnum).filter(e => !isNaN(parseInt(e[0])));
        this.ranks = ranksEntries.map((rank: any[]) => {
            return ({ id: (parseInt(rank[0]) + 1).toString(), name: rank[1] });
        });
        this.playersService.initPlayerListService();
        this.chatService.handleMessages().subscribe(({ message, from }: PayloadFromEvent) => {
            const contactPlayer = { socketId: from, nickname: message.author };
            if (!this.contactPlayers.find(() => contactPlayer.socketId)) {
                this.contactPlayers.push(contactPlayer);
            }
        });
    }

    public get players() {
        return this.playersService.players;
    }

    public onPlayerClick(player: Player) {
        if (this.currentPlayer && player.nickname === this.currentPlayer.nickname) {
            this.snackBarService.open('You cannot contact yourself.', undefined, {
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
            rank_id: this.playerRankId.value
        };
        if (player.nickname!.length === 0 || player.language_id!.length === 0) {
            return;
        }
        this.playersService.addPlayer(player);
        this.snackBarService.open('Player successfully added! Please wait a few sec before refreshed list.', undefined, {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
        this.currentPlayer = player;
        this.chatService.saveCurrentPlayer(player);
    }
}
