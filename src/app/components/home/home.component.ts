import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { PlayersService } from '../../services/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, repeat } from 'rxjs/operators';
import { Rank } from '../../interfaces/rank.interface';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { RankEnum } from '../../enums/rank.enum';


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
export class HomeComponent implements OnInit, OnDestroy {
  public playerNicknameFromControl: FormControl = new FormControl('', Validators.required);

  public isPlayerPresent: boolean = false;

  public playerNickname: FormControl = new FormControl("");
  public playerLanguageId: FormControl = new FormControl("");
  public playerRankId: FormControl = new FormControl("");

  private currentPlayer: any;

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

    this.playersService.getWaitingPlayers().toPromise().then((players) => { // we just init the array here but the update is startGetWaitingPlayersUpdate method
      this.players = players;
    });
    this.startGetWaitingPlayersUpdate();
  }

  private startGetWaitingPlayersUpdate() {
    this.playersService.getWaitingPlayers().pipe(delay(this.timeBetweenGetPlayers), repeat()).subscribe((playersData: Player[]) => {

      const newPlayersWaiting = playersData.filter((player: Player) => { // filter player already present
        return !this.players.find(currentPlayer => currentPlayer.nickname == player.nickname);
      });

      const playersToRemove = this.players.filter((player: Player) => {
        return !playersData.find(playerData => playerData.nickname == player.nickname);
      })

      let players = [...this.players];
      playersToRemove.forEach((playerToRemove) => {
        players.splice(players.indexOf(playerToRemove), 1);
      });
      players = players.concat(newPlayersWaiting);
      this.players = players;
    });
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
    this.playersService.addPlayer(player).then(() => {
      this.snackBarService.open('Player successfully added! Please wait 10 sec before refresh.', undefined, {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.isPlayerPresent = true;
      this.currentPlayer = player;
    });
  }

  public getRankImageUrl(rankId: string): string {
    return '../assets/images/ranks/skillgroup' + rankId + '.png';
  }

  public getLanguageImage(languageId: string): string {
    return 'https://www.countryflags.io/' + languageId + '/flat/32.png';
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    if (this.currentPlayer) {
      await this.playersService.removePlayer(this.currentPlayer);
    }
  }
}
