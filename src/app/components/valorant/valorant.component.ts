import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValorantRankEnum } from 'src/app/enums/valorantrank.enum';
import { PayloadFromEvent } from 'src/app/interfaces/payload.interface';
import { ChatService } from 'src/app/services/chat.service';
import { Character } from '../../interfaces/character.interface';
import { GameType, Player } from '../../interfaces/player.interface';
import { Rank } from '../../interfaces/rank.interface';
import { PlayersService } from '../../services/players.service';

@Component({
    selector: 'app-valorant',
    templateUrl: './valorant.component.html',
    styleUrls: ['./valorant.component.scss'],
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
export class ValorantComponent implements OnInit {
    public playerNicknameFormControl: FormControl = new FormControl('', Validators.required);

    public playerNickname: FormControl = new FormControl("");
    public playerLanguageId: FormControl = new FormControl("");
    public playerRankId: FormControl = new FormControl("");
    public playerCharacterId: FormControl = new FormControl("");

    public currentPlayer: any;

    public languages = ['us'];
    public ranks: Rank[] = [];
    public characters: Character[] = [];

    public contactPlayers: Player[] = [];

    constructor(private playersService: PlayersService, private chatService: ChatService, private snackBarService: MatSnackBar) { }

    ngOnInit(): void {
        const language = window.navigator.language.split("-")[0];
        this.languages.push(language);

        const ranksEntries = Object.entries(ValorantRankEnum).filter(e => !isNaN(parseInt(e[0])));
        this.ranks = ranksEntries.map((rank: any[]) => {
            return ({ id: (parseInt(rank[0]) + 1).toString(), name: rank[1] });
        });
        this.playersService.initPlayerListService(GameType.VALORANT);
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
            rank_id: this.playerRankId.value,
            character_id: this.playerCharacterId.value,
            gameType: this.playersService.gameType
        };
        this.playersService.addPlayer(player);
    }

}
