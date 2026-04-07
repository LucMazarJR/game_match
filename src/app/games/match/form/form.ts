import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';
import { FormsApi } from './forms-api';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  private formsApi = inject(FormsApi);

  public loading = signal(true);
  public errorMessage = signal<string | null>(null);

  readonly selectedPlataformIds = input<number[]>([]);
  readonly selectedPlataformsChange = output<number[]>();

  public plataforms = toSignal(
    this.formsApi.getGamesPlataforms().pipe(
      catchError(() => {
        this.errorMessage.set('Nao foi possivel carregar as plataformas.');
        return of([]);
      }),
      finalize(() => this.loading.set(false)),
    ),
    { initialValue: [] },
  );

  protected togglePlataform(plataformId: number) {
    const currentIds = this.selectedPlataformIds();
    const nextIds = currentIds.includes(plataformId)
      ? currentIds.filter((id) => id !== plataformId)
      : [...currentIds, plataformId];

    this.selectedPlataformsChange.emit(nextIds);
  }
}
