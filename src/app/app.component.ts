import { Component, Inject, OnInit, ViewEncapsulation, ɵɵresolveBody } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PlayersService } from './services/players.service';
import { DOCUMENT } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

interface Button {
  label: string;
  route: string;
  bodyClass: string;
  disabled: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public faLogo: IconDefinition = faUser;
  public faOnline: IconDefinition = faGlobe;

  public buttons: Button[] = [
    { label: 'CS:GO', route: '/csgo', bodyClass: 'body--csgo', disabled: false },
    { label: 'VALORANT (SOON)', route: '/valorant', bodyClass: 'body--valorant', disabled: true },
    { label: 'LEAGUE OF LEGEND (SOON)', route: '/leagueoflegend', bodyClass: 'body--leagueoflegend', disabled: true }
  ];

  public activeButton: Button = this.buttons[0];

  constructor(private playerService: PlayersService, private router: Router, @Inject(DOCUMENT) private _document: any) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      const route = e.url;
      if (e instanceof NavigationEnd) {
        this._document.body.classList.remove(this._document.body.classList.item(1));
        for (let i = 0; i < this.buttons.length; i++) {
          if (this.buttons[i].route == route) {
            this.activeButton = this.buttons[i];
            break;
          }
        }
        this._document.body.classList.add(this.activeButton.bodyClass);
      }
    })
  }

  public onButtonClick(button: Button) {
    this.activeButton = button;
  }

  public get playersOnline() {
    return this.playerService.PlayersCount;
  }
}
