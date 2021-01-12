import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { PlayersService } from '../../services/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, repeat } from 'rxjs/operators';
import { RankEnum } from '../../enums/Rank.enum';
import { Rank } from '../../interfaces/rank.interface';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('playerForm', [
      transition(':leave', [
        style({ transform: 'translate(0,0)', opacity: 1 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'translate(0, -100%)', opacity: 0 }))  // final
      ])
    ]),
    trigger('playerItem', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ]),
    trigger('playerList', [
      transition(':enter', [
        query('@playerItem', stagger(300, animateChild()), { optional: true })
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  public isPlayerPresent: boolean = false;

  public playerNickname: string = "";
  public playerLanguageId: string = "";
  public playerRankId: string = "";
  public players: Player[] = [];

  public languages = ['us'];
  public ranks: Rank[] = [];

  private timeBetweenGetPlayers = 5000;

  constructor(private playersService: PlayersService, private snackBarService: MatSnackBar) { }

  ngOnInit(): void {
    const language = window.navigator.language.split("-")[0];
    this.languages.push(language);

    const ranksEntries = Object.entries(RankEnum).filter(e => !isNaN(parseInt(e[0])));
    this.ranks = ranksEntries.map((rank: any[]) => {
      return ({ id: (parseInt(rank[0]) + 1).toString(), name: rank[1] });
    });

    this.playersService.getWaitingPlayers().pipe(delay(this.timeBetweenGetPlayers), repeat()).subscribe((players: Player[]) => {
      const newPlayersWaiting = players.filter((player: Player) => { // filter player already present
        return !this.players.find(currentPlayer => currentPlayer.nickname == player.nickname);
      });
      if (newPlayersWaiting.length > 0) {
        this.players = this.players.concat(newPlayersWaiting);
      }
    })
  }

  public addPlayer() {
    const player: Player = {
      nickname: this.playerNickname,
      language_id: this.playerLanguageId,
      rank_id: this.playerRankId
    };
    this.playersService.addPlayer(player).then(() => {
      this.snackBarService.open('Player successfully added! Please wait 10 sec before refresh.', undefined, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.isPlayerPresent = true;
    });
  }

  public getRankImageUrl(rankId: string): string {
    return '../assets/images/ranks/skillgroup' + rankId + '.png';
  }

  public getLanguageImage(languageId: string): string {
    return 'https://www.countryflags.io/' + languageId + '/flat/32.png';
  }
}
