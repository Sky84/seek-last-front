import { Component } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    public isOpened: boolean = false;
    public playerNickname:string = "Carry du 2B";
}
