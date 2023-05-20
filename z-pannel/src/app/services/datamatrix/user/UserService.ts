import API from "@/app/Util/API";
import Config from "@/app/Util/Config";
import axios from "axios";
import { IDMDiscordUser } from "../discord_user/IDiscordUser";
import DataMatrixService from "../DataMatrixService";

export interface IDMUser {
  id: number;
  login: string;
  name: string;
  password: string;
  email: string;
  date_inserted?: Date;
  date_updated?: Date;
}

interface IDMAddResponse {
  message: string;
  data: IDMUser;
  errors?: any;
}

export default class UserService extends DataMatrixService {
  private static _resource = "user";
  private static _url = `${this.baseUrl}${this._resource}`;
  constructor() {
    super();
  }

  static async getById<IDMUser>(id: string): Promise<IDMUser> {
    return await API.get<IDMUser>({ url: `${this._url}/${id}` });
  }

  static async getAll<IDMUser>(): Promise<Array<IDMUser>> {
    const response = (await axios.get<Array<IDMUser>>(this._url,)).data;
    console.log(response);
    return response;
  }

  static async add(user: IDMUser): Promise<IDMAddResponse> {
    const body = JSON.stringify(user);
    const response = (await axios.post(this._url, body)).data;
    return response;
  }
}
