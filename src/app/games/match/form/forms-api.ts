import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable, shareReplay } from 'rxjs';

export type PlataformsResponse = {
  results: { id: number; name: string }[];
};

export type StoresResponse = {
  results: { id: number; name: string }[];
};

@Injectable({
  providedIn: 'root',
})
export class FormsApi {
  private http = inject(HttpClient);
  private platformsCache$?: Observable<{ id: number; name: string }[]>;
  private storesCache$?: Observable<{ id: number; name: string }[]>;

  public getGamesPlataforms(): Observable<{ id: number; name: string }[]> {
    if (!this.platformsCache$) {
      this.platformsCache$ = this.http
        .get<PlataformsResponse>(`${environment.apiUrl}/platforms`)
        .pipe(
          map((result) => result.results.map(({ id, name }) => ({ id, name }))),
          shareReplay({ bufferSize: 1, refCount: true }),
        );
    }

    return this.platformsCache$;
  }

  public clearPlatformsCache(): void {
    this.platformsCache$ = undefined;
  }

  public getGamesStores(): Observable<{ id: number; name: string }[]> {
    if (!this.storesCache$) {
      this.storesCache$ = this.http.get<StoresResponse>(`${environment.apiUrl}/stores`).pipe(
        map((result) => result.results.map(({ id, name }) => ({ id, name }))),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    }

    return this.storesCache$;
  }

  public clearStoresCache(): void {
    this.storesCache$ = undefined;
  }
}
