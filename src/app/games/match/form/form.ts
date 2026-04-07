import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
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
  private static readonly EXPAND_STORAGE_KEY = 'match-form-expand-platforms';

  private formsApi = inject(FormsApi);

  public loading = signal(true);
  public loadingStores = signal(true);
  public errorMessage = signal<string | null>(null);
  public storesErrorMessage = signal<string | null>(null);

  readonly selectedPlataformIds = input<number[]>([]);
  readonly selectedPlataformsChange = output<number[]>();
  readonly selectedStoreIds = input<number[]>([]);
  readonly selectedStoresChange = output<number[]>();

  protected readonly expandPlataforms = signal<boolean>(this.getInitialExpandState());

  public plataforms = toSignal(
    this.formsApi.getGamesPlataforms().pipe(
      catchError(() => {
        this.errorMessage.set('Nao foi possivel carregar as plataformas.');
        return of([]);
      }),
      finalize(() => {
        this.loading.set(false);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly plataformsExibitions = computed(() => {
    const allPlataforms = this.plataforms();
    return this.expandPlataforms() ? allPlataforms : allPlataforms.slice(0, 12);
  });

  public stores = toSignal(
    this.formsApi.getGamesStores().pipe(
      catchError(() => {
        this.storesErrorMessage.set('Nao foi possivel carregar as lojas.');
        return of([]);
      }),
      finalize(() => {
        this.loadingStores.set(false);
      }),
    ),
    { initialValue: [] },
  );

  private readonly persistExpandState = effect(() => {
    this.setExpandState(this.expandPlataforms());
  });

  public tooglePlataformExpanded() {
    this.expandPlataforms.update((value) => !value);
  }

  private getInitialExpandState(): boolean {
    try {
      return sessionStorage.getItem(Form.EXPAND_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private setExpandState(value: boolean): void {
    try {
      sessionStorage.setItem(Form.EXPAND_STORAGE_KEY, String(value));
    } catch {
      // Sem persistencia disponivel, mantem apenas em memoria do componente.
    }
  }

  protected togglePlataform(plataformId: number) {
    const currentIds = this.selectedPlataformIds();
    const nextIds = currentIds.includes(plataformId)
      ? currentIds.filter((id) => id !== plataformId)
      : [...currentIds, plataformId];

    this.selectedPlataformsChange.emit(nextIds);
  }

  protected toggleStore(storeId: number) {
    const currentIds = this.selectedStoreIds();
    const nextIds = currentIds.includes(storeId)
      ? currentIds.filter((id) => id !== storeId)
      : [...currentIds, storeId];

    this.selectedStoresChange.emit(nextIds);
  }
}
