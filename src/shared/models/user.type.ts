export interface User {
  firstName: string;
  lastName: string;
  birthDate: Date;
  picture: string;
  mail: string;
  userName: string;
  password: string | null;
  profile: Profile;
}

export enum Profile {
  Admin = 'Admin',
  Sellers = 'Seller',
  Client = 'Client',
}
