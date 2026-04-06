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
            { gameId: 4, name: 'Action', lucideIcon: 'lucideSwords' },
            { gameId: 51, name: 'Indie', lucideIcon: 'lucideSprout' },
            { gameId: 3, name: 'Adventure', lucideIcon: 'lucideBackpack' },
            { gameId: 5, name: 'RPG', lucideIcon: 'lucideMap' },
            { gameId: 10, name: 'Strategy', lucideIcon: 'lucideLandPlot' },
            { gameId: 2, name: 'Shooter', lucideIcon: 'lucideTarget' },
            { gameId: 40, name: 'Casual', lucideIcon: 'lucideHeadphones' },
            { gameId: 14, name: 'Simulation', lucideIcon: 'lucideTrees' },
            { gameId: 7, name: 'Puzzle', lucideIcon: 'lucidePuzzle' },
            { gameId: 11, name: 'Arcade', lucideIcon: 'lucideBoxes' },
            { gameId: 83, name: 'Platformer', lucideIcon: 'lucideGamepad2' },
            { gameId: 59, name: 'Massively Multiplayer', lucideIcon: 'lucideGlobe' },
            { gameId: 1, name: 'Racing', lucideIcon: 'lucideTrophy' },
            { gameId: 15, name: 'Sports', lucideIcon: 'lucideVolleyball' },
            { gameId: 6, name: 'Fighting', lucideIcon: 'lucideHandFist' },
            { gameId: 19, name: 'Family', lucideIcon: 'lucideHouse' },
            { gameId: 28, name: 'Board Games', lucideIcon: 'lucideChessQueen' },
            { gameId: 17, name: 'Card', lucideIcon: 'lucideSpade' },
            { gameId: 34, name: 'Educational', lucideIcon: 'lucideGraduationCap' },
        ];
    }

    public getGamesGenres(): GameGenre[] {
        return this.genres;
    }
}