import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeType } from '../shared/models/theme';

import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'ts-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  get currentTheme(): ThemeType {
    return this.themeService.currentTheme;
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.loadTheme(true);
  }

  changeTheme(): void {
    const theme: ThemeType =
      this.themeService.currentTheme === 'dark' ? 'light' : 'dark';

    this.themeService.changeTheme(theme);
  }
}
