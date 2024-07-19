import { IBaseData, IBaseSearch } from "./base.d";

export interface IService extends IBaseData {
  name: string;
  verion: string;
  homePath: string;
  startBash: string;
  stopBash: string;
  restartBash: string;
  statusBash: string;
  jps: string;
}

export interface IServiceSearch extends IBaseSearch {
  name?: string;
}
