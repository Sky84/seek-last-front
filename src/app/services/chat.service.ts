import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient) { }

    public sendMessage(message: Message): Promise<any> {
        return this.http.post("http://localhost:3000/message", { message }).toPromise();
    }
}
