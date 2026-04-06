import { Routes } from '@angular/router';
import { Games } from './games/games';

export const routes: Routes = [
    { path: '', component: Games},
    { path: '**', redirectTo: '' }
];
