import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { formApi } from './match';
import { map } from 'rxjs';

export type resultedGamesType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: gameType[];
};

type gameType = {
  id: number;
  name: string;
  background_image: string;
};

@Injectable({
  providedIn: 'root',
})
export class MatchApi {
  private http = inject(HttpClient);

  public getGamesByFilter(formResult: formApi) {
    return this.http
      .get<resultedGamesType>(
        `${environment.apiUrl}/games?${environment.key}&page=1&page_size=20&platforms=${formResult.selectedPlataformIds.join(',')}&stores=${formResult.selectedStoreIds.join(',')}&genres=${formResult.selectedGenreIds.join(',')}`,
      )
      .pipe(
        map((response) => ({
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map((game) => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
          })),
        })),
      );
  }
}
