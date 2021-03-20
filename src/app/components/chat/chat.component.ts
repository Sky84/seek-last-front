import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message.interface';
import { ChatService } from 'src/app/services/chat.service';
import { Player } from '../../interfaces/player.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    public isOpened: boolean = false;

    @Input() contactPlayerSocketId: string = "";
    @Input() contactPlayerNickname: string = "";
    public messageContentToSend: string = "";
    public messages: Message[] = [];
    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.messagesSubject.subscribe((messages) => {
            this.messages = messages;
        });
    }

    public isMessageFromMe(message: Message) {
        return message.author === this.getAuthorByLocalStorage();
    }

    public onSendButtonClick(): void {
        if (this.messageContentToSend == "" || this.messageContentToSend == null || this.messageContentToSend == undefined) {
            return;
        }
        const message: Message = { author: this.getAuthorByLocalStorage(), content: this.messageContentToSend.toString(), destinator: this.contactPlayerSocketId };
        this.messageContentToSend = "";
        this.chatService.sendMessage(this.contactPlayerSocketId,message);
    }

    private getAuthorByLocalStorage() {
        const currentPlayer = JSON.parse(localStorage.getItem('currentPlayer') || '{"nickname":"unkown"}');
        return currentPlayer.nickname;
    }
}
