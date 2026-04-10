import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Genre } from './genre/genre';
import { Form } from './form/form';
import { MatchApi, resultedGamesType } from './match-api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

export type formApi = {
  selectedGenreId: number;
  selectedPlataformIds: number[];
  selectedStoreIds: number[];
};

@Component({
  selector: 'app-match',
  imports: [Genre, Form, RouterLink],
  templateUrl: './match.html',
})
export class Match {
  private static readonly PAGE_SIZE = 20;

  private matchApi = inject(MatchApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly routeQueryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  public loading = signal(false);
  protected readonly formApiData = signal<formApi>({
    selectedGenreId: 0,
    selectedPlataformIds: [],
    selectedStoreIds: [],
  });
  protected readonly formPage = signal<number>(0);
  protected readonly currentResultsPage = signal<number>(1);
  protected readonly games = signal<resultedGamesType | null>(null);
  protected readonly totalPages = computed(() => {
    const totalItems = this.games()?.count ?? 0;
    return Math.max(1, Math.ceil(totalItems / Match.PAGE_SIZE));
  });

  constructor() {
    effect(() => {
      const params = this.routeQueryParamMap();
      const genreId = this.parseSingleIdParam(params.get('genreId'));
      const platformIds = this.parseIdsParam(
        params.get('platformIds') ?? params.get('plataformIds') ?? params.get('plataformId'),
      );
      const storeIds = this.parseIdsParam(params.get('storeIds') ?? params.get('storeId'));
      const page = this.parsePageParam(params.get('page'));
      const hasRouteParams = genreId > 0 || platformIds.length > 0 || storeIds.length > 0;

      if (!hasRouteParams) {
        this.formPage.set(0);
        this.currentResultsPage.set(1);
        this.games.set(null);
        return;
      }

      this.formApiData.set({
        selectedGenreId: genreId,
        selectedPlataformIds: platformIds,
        selectedStoreIds: storeIds,
      });
      this.currentResultsPage.set(page);
      this.formPage.set(2);
      this.handleGameApiData(page);
    });
  }

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
    if (this.formPage() === 0) {
      this.formPage.set(1);
      return;
    }

    if (this.formPage() === 1) {
      this.router.navigate(['/match'], {
        queryParams: this.buildFiltersQueryParams(1),
      });
    }
  }

  private handleGameApiData(page: number) {
    this.loading.set(true);
    this.matchApi
      .getGamesByFilter(this.formApiData(), page)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.games.set(data),
        error: () => this.games.set(null),
      });
  }

  protected changeGamesPage(page: number) {
    this.router.navigate(['/match'], {
      queryParams: this.buildFiltersQueryParams(page),
    });
  }

  protected backToFilters() {
    this.games.set(null);
    this.formPage.set(0);
    this.router.navigate(['/match']);
  }

  private buildFiltersQueryParams(page: number): Record<string, number | string> {
    const payload = this.formApiData();
    const queryParams: Record<string, number | string> = {
      page: Math.max(1, Math.floor(page)),
    };

    if (payload.selectedGenreId > 0) {
      queryParams['genreId'] = payload.selectedGenreId;
    }

    if (payload.selectedPlataformIds.length > 0) {
      queryParams['platformIds'] = payload.selectedPlataformIds.join(',');
    }

    if (payload.selectedStoreIds.length > 0) {
      queryParams['storeIds'] = payload.selectedStoreIds.join(',');
    }

    return queryParams;
  }

  private parseSingleIdParam(paramValue: string | null): number {
    if (!paramValue) {
      return 0;
    }

    const parsed = Number(paramValue);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 0;
  }

  private parsePageParam(paramValue: string | null): number {
    if (!paramValue) {
      return 1;
    }

    const parsed = Number(paramValue);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
  }

  private parseIdsParam(paramValue: string | null): number[] {
    if (!paramValue || paramValue === '0') {
      return [];
    }

    return paramValue
      .split(',')
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id) && id > 0);
  }
}
