import { Component, inject, signal } from '@angular/core';
import { Genre } from './genre/genre';
import { Form } from './form/form';
import { MatchApi, resultedGamesType } from './match-api';
import { finalize } from 'rxjs';

export type formApi = {
  selectedGenreId: number;
  selectedPlataformIds: number[];
  selectedStoreIds: number[];
};

@Component({
  selector: 'app-match',
  imports: [Genre, Form],
  templateUrl: './match.html',
})
export class Match {
  private matchApi = inject(MatchApi);

  public loading = signal(false);
  protected readonly formApiData = signal<formApi>({
    selectedGenreId: 0,
    selectedPlataformIds: [],
    selectedStoreIds: [],
  });
  protected readonly formPage = signal<number>(0);
  protected readonly games = signal<resultedGamesType | null>(null);

  protected onSelectedPlataformsChange(ids: number[]) {
    this.formApiData.update((current) => ({
      ...current,
      selectedPlataformIds: ids,
    }));
  }

  protected onSelectedStoresChange(ids: number[]) {
    this.formApiData.update((current) => ({
      ...current,
      selectedStoreIds: ids,
    }));
  }

  protected onSelectedGenreChange(id: number) {
    this.formApiData.update((current) => ({
      ...current,
      selectedGenreId: id,
    }));
  }

  protected changePage() {
    this.formPage.update((prev) => (prev <= 1 ? prev + 1 : prev));
    if (this.formPage() === 2) {
      this.handleGameApiData();
    }
  }

  private handleGameApiData() {
    this.loading.set(true);
    this.matchApi
      .getGamesByFilter(this.formApiData())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.games.set(data),
        error: () => this.games.set(null),
      });
  }

  protected changeGamesPage(pageUrl: string) {
    this.loading.set(true);
    this.matchApi
      .getGamesByPage(pageUrl)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.games.set(data),
        error: () => this.games.set(null),
      });
  }
}
