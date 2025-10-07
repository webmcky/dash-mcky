export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface signInType {
  title?: string;
}

export interface VerifyUser {
  valid: boolean;
  newAccessToken?: string;
  error?: string;
}

export interface userAtributes {
    id: string,
    email:string,
    name:string,
    password:string
}