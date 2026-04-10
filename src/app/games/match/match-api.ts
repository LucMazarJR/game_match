import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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

  public getGamesByFilter(formResult: formApi, page: number = 1) {
    const safePage = Number.isInteger(page) && page > 0 ? page : 1;
    const queryParams = [
      `page=${safePage}`,
      'page_size=20',
      formResult.selectedPlataformIds.length > 0
        ? `platforms=${formResult.selectedPlataformIds.join(',')}`
        : '',
      formResult.selectedStoreIds.length > 0
        ? `stores=${formResult.selectedStoreIds.join(',')}`
        : '',
      formResult.selectedGenreId != 0 ? `genres=${formResult.selectedGenreId}` : '',
    ]
      .filter(Boolean)
      .join('&');
    const url = `${environment.apiUrl}/games?${queryParams}`;

    return this.http.get<resultedGamesType>(url).pipe(
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
