import { Routes } from '@angular/router';
import { Games } from './games/games';
import { Match } from './games/match/match';

export const routes: Routes = [
  { path: '', component: Games },
  { path: 'match', component: Match },
  { path: '**', redirectTo: '' },
];
