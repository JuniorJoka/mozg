export interface RegisterViewerArgs {
  email: string;
  password: string;
  username: string;
}

export interface LoginViewerArgs {
  email?: string;
  username?: string;
  password: string;
}

export interface GetUserArgs {
  id?: string;
  username?: string;
}

export interface UserType {
  _id: string;
  email: string;
  password: string;
  username: string;
}
