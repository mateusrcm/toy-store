import { Injectable } from '@angular/core';
import { ThemeType } from '../models/theme';

export const themes: ThemeType[] = ['dark', 'light'];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private previousTheme!: ThemeType;
  private _currentTheme: ThemeType = 'dark';

  get currentTheme() {
    return this._currentTheme;
  }

  private set currentTheme(theme: ThemeType) {
    this._currentTheme = theme;
  }

  changeTheme(theme: ThemeType): void {
    this.previousTheme = this.currentTheme;
    this.currentTheme = theme;

    this.loadTheme();
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  loadTheme(firstLoad: boolean = false): Promise<void> {
    const theme = this.currentTheme;

    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }

    return this.loadCss(`${theme}.css`, theme).then(
      (_) => {
        if (!firstLoad) {
          document.documentElement.classList.add(theme);
        }
        this.removeUnusedTheme(this.previousTheme);
      },
      (e) => console.error(e)
    );
  }
}
