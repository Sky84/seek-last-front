import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogLoginComponent } from '../components/dialog-login/dialog-login.component';
import { Message } from '../interfaces/message.interface';
import { PayloadFromEvent } from '../interfaces/payload.interface';
import { Player } from '../interfaces/player.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private messages: Message[] = [];
    public messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject(this.messages);

    constructor(private socket: Socket, private dialog: MatDialog) { }

    public handleMessages(): Observable<PayloadFromEvent> {
        return this.socket.fromEvent<PayloadFromEvent>("chat_message").pipe(tap(({ message, from }: PayloadFromEvent) => {
            this.addMessage(message);
        }));
    }

    public sendMessage(to: string, message: Message) {
        if (!this.CurrentPlayer.nickname) {
            this.dialog.open(DialogLoginComponent).afterClosed().subscribe((playerNickname: string) => {
                if (playerNickname) {
                    this.saveCurrentPlayer({ nickname: playerNickname });
                    message.author = playerNickname;
                    this.socket.emit("chat_message", { message, to });
                    this.addMessage(message);
                }
            });
            return;
        }
        this.socket.emit("chat_message", { message, to });
        this.addMessage(message);
    }

    private addMessage(message: Message): void {
        this.messages.push(message);
        this.messagesSubject.next(this.messages);
    }

    public get CurrentPlayer(): Player {
        const currentPlayer = localStorage.getItem("currentPlayer") || '{}';
        return JSON.parse(currentPlayer);
    }

    public saveCurrentPlayer(player: Player) {
        localStorage.setItem('currentPlayer', JSON.stringify(player));
    }
}

