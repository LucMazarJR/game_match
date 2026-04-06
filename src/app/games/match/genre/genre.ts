import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { LucideBackpack, LucideBoxes, LucideChessQueen, LucideDynamicIcon, LucideGamepad2, LucideGlobe, LucideGraduationCap, LucideHandFist, LucideHeadphones, LucideHouse, LucideLandPlot, LucideMap, LucidePuzzle, LucideSpade, LucideSprout, LucideSwords, LucideTarget, LucideTrees, LucideTrophy, LucideVolleyball } from '@lucide/angular';
import type { LucideIconInput } from '@lucide/angular';
import { GamesGenres } from './game-genres-mock';


@Component({
  selector: 'app-genre',
  imports: [LucideDynamicIcon],
  templateUrl: './genre.html',
  styleUrls: ['./genre.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Genre {
  private readonly gamesGenresService = inject(GamesGenres);
  readonly genres = this.gamesGenresService.getGamesGenres();
  protected selectedGenresIds = signal<number[]>([]);
  readonly selectedGenresChange = output<number[]>();

  private readonly iconMap: Record<string, LucideIconInput> = {
    lucideSwords: LucideSwords,
    lucideSprout: LucideSprout,
    lucideBackpack: LucideBackpack,
    lucideMap: LucideMap,
    lucideLandPlot: LucideLandPlot,
    lucideTarget: LucideTarget,
    lucideHeadphones: LucideHeadphones,
    lucideTrees: LucideTrees,
    lucidePuzzle: LucidePuzzle,
    lucideBoxes: LucideBoxes,
    lucideGamepad2: LucideGamepad2,
    lucideGlobe: LucideGlobe,
    lucideTrophy: LucideTrophy,
    lucideVolleyball: LucideVolleyball,
    lucideHandFist: LucideHandFist,
    lucideHouse: LucideHouse,
    lucideChessQueen: LucideChessQueen,
    lucideSpade: LucideSpade,
    lucideGraduationCap: LucideGraduationCap,
  };

  protected getIcon(iconName: string): LucideIconInput {
    return this.iconMap[iconName] ?? LucideGamepad2;
  }

  protected toggleGenre(genreId: number) {
    this.selectedGenresIds.update(ids =>
      ids.includes(genreId) ? ids.filter(id => id !== genreId) : [...ids, genreId]
    );

    this.selectedGenresChange.emit(this.selectedGenresIds());
  }
}
