import Config from "@/app/Util/Config";
import { IDiscordAuth } from "./IDiscord";
import axios from "axios";

export default class DiscordService {
    static url = "https://discord.com/api/"
    static cdn = "https://cdn.discordapp.com/"
    static authUrl = `https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2F${Config.APP_HOST}%3A${Config.APP_PORT}%2Fadmin&response_type=code&scope=identify%20guilds%20guilds.members.read%20guilds.join%20gdm.join%20connections%20email`;
    

    constructor(){}

    static async authenticate(code: string) {
        try {
            console.log(code)
            const params = new URLSearchParams({
                client_id: "1102067081115091055", 
                client_secret: "61cmsrZc00EJD1s59azSmwXI1odOSZfz", 
                grant_type: "authorization_code", 
                code: code, 
                redirect_uri: `http://${Config.APP_HOST}:${Config.APP_PORT}/admin`, 
            })
            const headers = {
                'Content-Type':  'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/x-www-form-urlencoded'
            }
            const response: IDiscordAuth = await (await axios.post(`${this.url}oauth2/token`, params, {headers: headers} )).data

            // localStorage.setItem("access_token", response.access_token);
            // console.log(localStorage.getItem("access_token"));
            console.log(`User Authenticated successfuly!`);
            return response.access_token;
        }
        catch {
            return false;
        }
    }
}