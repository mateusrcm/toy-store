import { FormGroup } from '@angular/forms';

export function updateTreeValidity(group: FormGroup): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];

    if (abstractControl instanceof FormGroup) {
      updateTreeValidity(abstractControl);
    } else {
      abstractControl.markAsDirty();
      abstractControl.updateValueAndValidity();
    }
  });
}
