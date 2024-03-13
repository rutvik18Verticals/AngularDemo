import { ICommonMessage } from "./shared_Models";

export interface ILoginRequest{
    username:string,
    Password:string,
}

export interface IRegisterRequest extends ILoginRequest{
    Role:string
}

export interface ILoginRegisterResponse extends ICommonMessage {
  id: number;
  username: string;
  role: string;
  authToken: string;
}