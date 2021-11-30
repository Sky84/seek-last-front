export interface Player {
    socketId?: string;
    nickname: string;
    language_id?: string;
    rank_id?: string;
    character_id?: string;
    gameType: GameType;
}

export enum GameType {
    CSGO = 'csgo',
    VALORANT = 'valorant',
    LEAGUE_OF_LEGENDS = 'leagueoflegends',
}