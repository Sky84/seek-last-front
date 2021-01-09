import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/Player.interface';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public playerNickname: string = "";
  public playerLanguageId: string = "";
  public playerRankId: string = "";
  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {

  }

  public addPlayer() {
    const player: Player = {
      playerNickname: this.playerNickname,
      playerLanguageId: this.playerLanguageId,
      playerRankId: this.playerRankId
    };
    this.playersService.addPlayer(player).then(() => {
      console.log("test")
    });
  }

  public getRankImageUrl(rankId: string): string {
    return '../assets/images/ranks/skillgroup' + rankId + '.png';
  }

  public getLanguageImage(languageId: string): string {
    return 'https://www.countryflags.io/' + languageId + '/flat/32.png';
  }
}
