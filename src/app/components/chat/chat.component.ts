import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message.interface';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    public isOpened: boolean = false;
    public playerNickname: string = "Carry2D";
    public messageContentToSend: string = "";
    public messages: Message[] = [];

    constructor(private chatService: ChatService) { }

    ngOnInit() {

    }

    public onSendButtonClick(): void {
        const message: Message = { author: this.getAuthorByLocalStorage(), content: this.messageContentToSend };
        this.chatService.sendMessage(message);
    }

    private getAuthorByLocalStorage() {
        const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer') || '{"nickname":"unkown"}');
        return currentPlayer.nickname;
    }
}
