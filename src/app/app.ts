import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { LucideGamepad2 } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, LucideGamepad2],
  templateUrl: './app.html',
})

export class App {}
