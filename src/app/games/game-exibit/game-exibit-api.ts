import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';

type gameDataResponse = {
  name: string;
  description_raw: string;
  metacritic: number;
  released: string;
  background_image: string;
  website: string;
  platforms: { platform?: { name?: string } }[];
  stores: { store?: { name?: string } }[];
  genres: { name?: string }[];
};

export type gameDataType = {
  name: string;
  description_raw: string;
  metacritic: number;
  released: string;
  background_image: string;
  website: string;
  platforms: string[];
  stores: string[];
  genres: string[];
};

@Injectable({
  providedIn: 'root',
})
export class GameExibitApi {
  private http = inject(HttpClient);

  public getGameById(id: number): Observable<gameDataType> {
    const url = `${environment.apiUrl}/games/${id}?key=${environment.key}`;
    return this.http.get<gameDataResponse>(url).pipe(
      map((res) => ({
        name: res.name,
        description_raw: res.description_raw,
        metacritic: res.metacritic,
        released: res.released,
        background_image: res.background_image,
        website: res.website,
        platforms: (res.platforms ?? [])
          .map((p) => p.platform?.name)
          .filter((name): name is string => Boolean(name)),
        stores: (res.stores ?? [])
          .map((s) => s.store?.name)
          .filter((name): name is string => Boolean(name)),
        genres: (res.genres ?? [])
          .map((g) => g.name)
          .filter((name): name is string => Boolean(name)),
      })),
    );
  }
}
