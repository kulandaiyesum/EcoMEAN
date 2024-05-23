import { FormControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(
  control: FormControl
): Promise<ValidationErrors | null> {
  if (!control.parent || !control.parent.get('password')) {
    return Promise.resolve(null);
  }

  const password = control.parent.get('password')?.value;
  const confirmPassword = control.value;

  return new Promise((resolve) => {
    if (confirmPassword !== password) {
      resolve({ passwordMismatch: true });
    } else {
      resolve(null);
    }
  });
}
