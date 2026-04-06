import { Component } from '@angular/core';
import { Genre } from "./genre/genre";

@Component({
  selector: 'app-match',
  imports: [Genre],
  templateUrl: './match.html',
})
export class Match {}
