import { Message } from "./message.interface";

export interface PayloadFromEvent {
    message: Message;
    from: string;
}