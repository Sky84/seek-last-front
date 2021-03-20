import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RankEnum } from '../../enums/rank.enum';
import { Character } from '../../interfaces/character.interface';
import { Player } from '../../interfaces/player.interface';
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
  public players: Player[] = [];
  public playerNicknameFormControl: FormControl = new FormControl('', Validators.required);

  public playerNickname: FormControl = new FormControl("");
  public playerLanguageId: FormControl = new FormControl("");
  public playerRankId: FormControl = new FormControl("");
  public playerCharactersIds: FormControl = new FormControl("");

  public currentPlayer: any;

  public languages = ['us'];
  public ranks: Rank[] = [];
  public characters: Character[] = [];

  constructor(private playersService: PlayersService, private snackBarService: MatSnackBar) { }

  ngOnInit(): void {
    const language = window.navigator.language.split("-")[0];
    this.languages.push(language);

    const ranksEntries = Object.entries(RankEnum).filter(e => !isNaN(parseInt(e[0])));
    this.ranks = ranksEntries.map((rank: any[]) => {
      return ({ id: (parseInt(rank[0]) + 1).toString(), name: rank[1] });
    });
    if (localStorage.getItem('currentPlayer')) {
      this.currentPlayer = localStorage.getItem('currentPlayer');
    }
  }

  public addPlayer() {
    const player: Player = {
      nickname: this.playerNickname.value,
      language_id: this.playerLanguageId.value,
      rank_id: this.playerRankId.value
    };
    if (player.nickname.length === 0 || player.language_id.length === 0) {
      return;
    }
    this.playersService.addPlayer(player);
    this.snackBarService.open('Player successfully added! Please wait 5 sec before refreshed list.', undefined, {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.currentPlayer = player;
    localStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }

}
