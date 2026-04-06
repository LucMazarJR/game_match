import { Component, signal } from '@angular/core';
import { Genre } from "./genre/genre";

export type formApi = {
  selectedGenreIds: number[],
}

@Component({
  selector: 'app-match',
  imports: [Genre],
  templateUrl: './match.html',
})
export class Match {
  protected readonly formApiData = signal<formApi>({ selectedGenreIds: [] });

  protected onSelectedGenresChange(ids: number[]) {
    this.formApiData.update(current => ({
      ...current,
      selectedGenreIds: ids,
    }));
  }
}
