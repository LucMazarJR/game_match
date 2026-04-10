import { Routes } from '@angular/router';
import { Games } from './games/games';
import { Match } from './games/match/match';
import { GameExibit } from './games/game-exibit/game-exibit';

export const routes: Routes = [
  { path: '', component: Games },
  { path: 'match', component: Match },
  { path: 'game/:id', component: GameExibit },
  { path: '**', redirectTo: '' },
];
