export interface UserCredentials {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface User extends UserCredentials {
  firstName: string;
  lastName: string;
}