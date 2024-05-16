import {
  DestroyRef,
  Directive,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { Profile } from '../models/user.type';
import { UserService } from '../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ts-profile-access]',
  standalone: true,
  host: {
    '[style.display]': "hasAccess ? '' : 'none'",
  },
})
export class ProfileAccessDirective implements OnChanges {
  private destroyRef = inject(DestroyRef);

  tsProfiles = input.required<Profile[]>();
  hasAccess: boolean = false;

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.loggedIn$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateHasAccess();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tsProfiles']) {
      this.updateHasAccess();
    }
  }

  updateHasAccess(): void {
    const profiles = this.tsProfiles();

    this.hasAccess = profiles.some((prof) => prof === this.user.profile);
  }
}
