import { Injectable } from '@angular/core';

export type GameGenre = {
    genreId: number;
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
            { genreId: 4, name: 'Ação', lucideIcon: 'lucideSwords' },
            { genreId: 51, name: 'Indie', lucideIcon: 'lucideSprout' },
            { genreId: 3, name: 'Aventura', lucideIcon: 'lucideBackpack' },
            { genreId: 5, name: 'RPG', lucideIcon: 'lucideMap' },
            { genreId: 10, name: 'Estratégia', lucideIcon: 'lucideLandPlot' },
            { genreId: 2, name: 'Shooter', lucideIcon: 'lucideTarget' },
            { genreId: 40, name: 'Casual', lucideIcon: 'lucideHeadphones' },
            { genreId: 14, name: 'Simulação', lucideIcon: 'lucideTrees' },
            { genreId: 7, name: 'Puzzle', lucideIcon: 'lucidePuzzle' },
            { genreId: 11, name: 'Arcade', lucideIcon: 'lucideBoxes' },
            { genreId: 83, name: 'Plataforma', lucideIcon: 'lucideGamepad2' },
            { genreId: 59, name: 'MMO', lucideIcon: 'lucideGlobe' },
            { genreId: 1, name: 'Corrida', lucideIcon: 'lucideTrophy' },
            { genreId: 15, name: 'Esportes', lucideIcon: 'lucideVolleyball' },
            { genreId: 6, name: 'Luta', lucideIcon: 'lucideHandFist' },
            { genreId: 19, name: 'Familiar', lucideIcon: 'lucideHouse' },
            { genreId: 28, name: 'Tabuleiro', lucideIcon: 'lucideChessQueen' },
            { genreId: 17, name: 'Cartas', lucideIcon: 'lucideSpade' },
            { genreId: 34, name: 'Educacional', lucideIcon: 'lucideGraduationCap' },
        ];
    }

    public getGamesGenres(): GameGenre[] {
        return this.genres;
    }
}