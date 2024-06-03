export interface User {
  _id?: string;
  name: string;
  role: string; // USER or ADMIN
  password?: string;
  email: string;
  verified?: boolean;
  createdAt?: Date;
}
