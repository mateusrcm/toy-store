import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeType } from '../shared/models/theme';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'ts-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzBreadCrumbModule,
    NzToolTipModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    NzIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  isCollapsed: boolean = true;

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
