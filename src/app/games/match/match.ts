import { Component, signal } from '@angular/core';
import { Genre } from './genre/genre';
import { Form } from './form/form';

export type formApi = {
  selectedGenreIds: number[];
};

@Component({
  selector: 'app-match',
  imports: [Genre, Form],
  templateUrl: './match.html',
})
export class Match {
  protected readonly formApiData = signal<formApi>({ selectedGenreIds: [] });
  protected readonly formPage = signal<number>(1); //Valor padrão = 0, 1 para dev

  protected onSelectedGenresChange(ids: number[]) {
    this.formApiData.update((current) => ({
      ...current,
      selectedGenreIds: ids,
    }));
  }
}
