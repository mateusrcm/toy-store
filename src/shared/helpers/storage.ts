export function SessionStorage<T>(
  name: string,
): (target: any, propName: string, descriptor?: PropertyDescriptor) => void {
  function propDecorator(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor,
  ): any {
    const privatePropName = `$$__tsPropDecorator__${propertyKey}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(
        `The prop "${privatePropName}" already exist, it will be overridden by ${name} decorator.`,
      );
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
    });

    return {
      get(): string {
        return descriptor && descriptor.get
          ? descriptor.get.bind(this)()
          : this[privatePropName];
      },
      set(value: T): void {
        if (descriptor && descriptor.set) {
          descriptor.set.bind(this)(value);
        }

        sessionStorage.setItem(name, `${value}`);

        this[privatePropName] = value;
      },
    };
  }

  return propDecorator;
}
