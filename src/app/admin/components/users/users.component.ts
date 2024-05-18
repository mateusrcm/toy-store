import { Component, Input } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'ts-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.less',
})
export class UsersComponent {
  @Input({ required: true }) position!: NzTabPosition;

  isDrawerOpen: boolean = false;
}
