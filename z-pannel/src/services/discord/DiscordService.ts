import Config from "@/Util/Config";
import { IDiscordAuth } from "@/interfaces/IDiscord";
import axios from "axios";

export default class DiscordService {
    static ACCESS_TOKEN = "";
    static url = "https://discord.com/api/"
    static cdn = "https://cdn.discordapp.com/"

    constructor(){}

    static async authenticate(code: string) {
        try {
            const params = new URLSearchParams({
                client_id: "1102067081115091055", 
                client_secret: "61cmsrZc00EJD1s59azSmwXI1odOSZfz", 
                grant_type: "authorization_code", 
                code: code, 
                redirect_uri: `http://${Config.APP_HOST}:${Config.APP_PORT}/dashboard`, 
            })
            const headers = {
                'Content-Type':  'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/x-www-form-urlencoded'
            }
            const response: IDiscordAuth = await (await axios.post(`${this.url}oauth2/token`, params, {headers: headers} )).data
            this.ACCESS_TOKEN = response.access_token;
            console.log(`User Authenticated successfuly!`);
            return true;
        }
        catch {
            return false;
        }
    }
}