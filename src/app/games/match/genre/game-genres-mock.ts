import { Injectable } from '@angular/core';

export type GameGenre = {
    gameId: number;
    name: string;
    lucideIcon: string;
};

@Injectable({
    providedIn: 'root',
})
export class GamesGenres {
    private genres: GameGenre[];

    constructor() {
        this.genres = [
            { gameId: 4, name: 'Ação', lucideIcon: 'lucideSwords' },
            { gameId: 51, name: 'Indie', lucideIcon: 'lucideSprout' },
            { gameId: 3, name: 'Aventura', lucideIcon: 'lucideBackpack' },
            { gameId: 5, name: 'RPG', lucideIcon: 'lucideMap' },
            { gameId: 10, name: 'Estratégia', lucideIcon: 'lucideLandPlot' },
            { gameId: 2, name: 'Shooter', lucideIcon: 'lucideTarget' },
            { gameId: 40, name: 'Casual', lucideIcon: 'lucideHeadphones' },
            { gameId: 14, name: 'Simulação', lucideIcon: 'lucideTrees' },
            { gameId: 7, name: 'Puzzle', lucideIcon: 'lucidePuzzle' },
            { gameId: 11, name: 'Arcade', lucideIcon: 'lucideBoxes' },
            { gameId: 83, name: 'Plataforma', lucideIcon: 'lucideGamepad2' },
            { gameId: 59, name: 'MMO', lucideIcon: 'lucideGlobe' },
            { gameId: 1, name: 'Corrida', lucideIcon: 'lucideTrophy' },
            { gameId: 15, name: 'Esportes', lucideIcon: 'lucideVolleyball' },
            { gameId: 6, name: 'Luta', lucideIcon: 'lucideHandFist' },
            { gameId: 19, name: 'Familiar', lucideIcon: 'lucideHouse' },
            { gameId: 28, name: 'Tabuleiro', lucideIcon: 'lucideChessQueen' },
            { gameId: 17, name: 'Cartas', lucideIcon: 'lucideSpade' },
            { gameId: 34, name: 'Educacional', lucideIcon: 'lucideGraduationCap' },
        ];
    }

    public getGamesGenres(): GameGenre[] {
        return this.genres;
    }
}