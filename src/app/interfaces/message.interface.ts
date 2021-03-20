export interface Message {
    author: string;
    content: string;
    destinator: string;
    createdAt?: string;
    receivedAt?: string;
}