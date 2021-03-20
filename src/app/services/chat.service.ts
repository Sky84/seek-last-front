import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { Player } from '../interfaces/player.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messages: Message[] = [];
    public messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject(this.messages);

    constructor(private socket: Socket) {
        this.socket.on("received_message", (message: Message) => {
            this.messages.push(message);
            this.messagesSubject.next(this.messages);
        });
    }

    public sendMessage(contactPlayerSocketId: string, message: Message) {
        this.socket.emit("chat_message", contactPlayerSocketId, message);
    }
}
