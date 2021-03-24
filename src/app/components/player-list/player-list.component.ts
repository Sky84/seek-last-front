import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { ImagesService } from '../../services/images.service';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss'],
    animations: [
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
        ])]
})
export class PlayerListComponent implements OnInit {

    @Input() game: string = "";
    @Input() players: Player[] = [];
    @Output() onPlayerClick: EventEmitter<Player> = new EventEmitter<Player>();

    constructor(private imagesService: ImagesService) { }

    ngOnInit(): void {
    }

    public _onPlayerClick(player: Player): void {
        this.onPlayerClick.emit({ ...player });
    }

    public getRankImageUrl(rankId: string): string {
        return this.imagesService.getRankImageUrl(this.game, rankId);
    }

    public getLanguageImage(languageId: string): string {
        return this.imagesService.getLanguageImage(languageId);
    }
}
