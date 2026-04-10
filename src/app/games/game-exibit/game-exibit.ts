import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gameDataType, GameExibitApi } from './game-exibit-api';
import { finalize } from 'rxjs';
import { LucideLoaderCircle } from '@lucide/angular';

@Component({
  selector: 'app-game-exibit',
  imports: [LucideLoaderCircle],
  templateUrl: './game-exibit.html',
})
export class GameExibit {
  readonly gameId: string;
  private gameApi = inject(GameExibitApi);
  private route = inject(ActivatedRoute);

  protected readonly isLoading = signal<boolean>(true);
  protected readonly gameData = signal<gameDataType | null>(null);

  constructor() {
    this.gameId = this.route.snapshot.paramMap.get('id') ?? '';

    this.gameApi
      .getGameById(Number(this.gameId))
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          this.gameData.set(data);
          console.log(data);
        },
      });
  }
}
