export interface ItokenInformation {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface IUserToken {
  id: string;
  email: string;
  isAdmin: boolean;
}
