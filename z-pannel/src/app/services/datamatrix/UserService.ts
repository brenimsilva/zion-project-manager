import API from "@/app/Util/API";
import Config from "@/app/Util/Config";
import axios from "axios";

export const revalidate = 30;

export default class UserService {
  private static _resource = "user";
  private static _url = `http://${Config.DATAMATRIX_HOST}:${Config.DATAMATRIX_PORT}/${this._resource}`;
  constructor() {}

  static async getById<IDMDiscordUser>(id: string): Promise<IDMDiscordUser> {
    return await API.get<IDMDiscordUser>({ url: `${this._url}/${id}` });
  }

  static async getAll<IDMDiscordUser>(): Promise<Array<IDMDiscordUser>> {
    const response = (await axios.get<Array<IDMDiscordUser>>(this._url, {data: {revalidate: 1}})).data;
    console.log(response);
    return response;
  }
}
