import { Component } from '@angular/core';
import { faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PlayersService } from './services/players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public faLogo: IconDefinition = faUser;
  public faOnline: IconDefinition = faGlobe;

  constructor(private playerService: PlayersService) { }

  public get playersOnline() {
    return this.playerService.PlayersCount;
  }
}
