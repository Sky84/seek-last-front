import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/message.interface';
import { ChatService } from 'src/app/services/chat.service';
import { Player } from '../../interfaces/player.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    public isOpened: boolean = true;

    @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;
    @Input() contactPlayer: Player = { nickname: "Unknow", language_id: "unknow", rank_id: "unknow" };
    public messageContentToSend: string = "";
    public messages: Message[] = [];
    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.messagesSubject.subscribe((messages) => {
            this.messages = messages;
            this.scrollToLastMessageElements();
        });
    }

    public scrollToLastMessageElements(): void {
        setTimeout(() => {
            const messageElems = document.querySelectorAll('.chat__window-content__messages__message');
            if (messageElems.length > 0) {
                messageElems[messageElems.length - 1].scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    public isMessageFromMe(message: Message) {
        return message.author === this.chatService.CurrentPlayer.nickname;
    }

    public onSendButtonClick(): void {
        if (this.messageContentToSend == "" || this.messageContentToSend == null || this.messageContentToSend == undefined) {
            return;
        }
        const message: Message = { author: this.chatService.CurrentPlayer.nickname, content: this.messageContentToSend.toString() };
        this.messageContentToSend = "";
        this.chatService.sendMessage(this.contactPlayer.socketId!, message);
        this.scrollToLastMessageElements();
    }

    public handleInputKeyUp($event: KeyboardEvent) {
        if ($event.key === "Enter") {
            this.onSendButtonClick();
        }
    }
}
