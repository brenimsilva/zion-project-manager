import Config from "@/Util/Config";
import axios from "axios";

export interface IDiscordAuth {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface IDiscordGuild {
    icon: string;
    id: string;
    name: string;
    owner: boolean;
    image: HTMLImageElement;
}

export interface IDiscordUser {
    avatar: string;
    id: string;
    username: string;
    guilds: Array<IDiscordGuild>
}

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

    static async getUserInfo(code: string): Promise<IDiscordUser> {
        try {
            const userGuilds = await (await axios.get(`${this.url}users/@me/guilds`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`
                }
            })).data.map((guild: IDiscordGuild): IDiscordGuild => {
                    const image = new Image();
                    image.src = `${this.cdn}icons/${guild.id}/${guild.icon}.png`
                return {icon: guild.icon, id: guild.id, name: guild.name, owner: guild.owner, image: image}
            })
            
    
            const {avatar, username, id} = await (await axios.get(`${this.url}users/@me`, {
                headers: {
                    Authorization: `Bearer ${this.ACCESS_TOKEN}`
                }
            })).data
            
            const user: IDiscordUser = {id, username, avatar, guilds: userGuilds}
            return user;
        }
        catch {
            return {avatar: "", guilds: [], id: "", username: ""}
        }
    }
}