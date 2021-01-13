import { Component } from '@angular/core';
import { faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PlayersService } from './services/players.service';

interface Button {
  label: string;
  route: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public faLogo: IconDefinition = faUser;
  public faOnline: IconDefinition = faGlobe;

  public buttons: Button[] = [
    { label: 'CS:GO', route: '/csgo' },
    { label: 'VALORANT', route: '/valorant' },
    { label: 'LEAGUE OF LEGEND', route: '/leagueoflegend' }
  ];

  public activeButton: Button = this.buttons[0];

  constructor(private playerService: PlayersService) { }

  public onButtonClick(button: Button) {
    this.activeButton = button;
  }

  public get playersOnline() {
    return this.playerService.PlayersCount;
  }
}
