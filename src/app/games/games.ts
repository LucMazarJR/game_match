import { Component } from '@angular/core';
import { LucideAArrowDown, LucideMoveLeft, LucideMoveRight, LucideArrowRight } from "@lucide/angular";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-games',
  imports: [LucideArrowRight, RouterLink],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games {}
