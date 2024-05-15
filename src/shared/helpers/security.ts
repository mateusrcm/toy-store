import { Profile } from '../models/user.type';

export function profileRestriction(...profiles: Profile[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    const method = descriptor.value;

    descriptor.value = () => {
      const profile = sessionStorage.getItem('profile');
      const hasAccess = profiles.some((prof) => profile === prof);

      if (hasAccess) return;

      return method;
    };
  };
}
