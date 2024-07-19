import { IBaseData } from "./base.d";

export interface IMaster extends IBaseData {
  ip: string;
  username: string;
  password: string;
}
