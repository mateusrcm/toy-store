import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ThemeType } from '../shared/models/theme';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ThemeService } from '../shared/services/theme.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'ts-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzBreadCrumbModule,
    NzTypographyModule,
    NzToolTipModule,
    NzLayoutModule,
    NzAvatarModule,
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

  //This should be memoized
  get currentTheme(): ThemeType {
    return this.themeService.currentTheme;
  }

  //This should be memoized
  get greeting(): string {
    return `Welcome, ${this.user.firstName}`;
  }

  constructor(private themeService: ThemeService, public user: UserService) {}

  ngOnInit(): void {
    this.themeService.loadTheme(true);
  }

  changeTheme(): void {
    const theme: ThemeType =
      this.themeService.currentTheme === 'dark' ? 'light' : 'dark';

    this.themeService.changeTheme(theme);
  }
}
