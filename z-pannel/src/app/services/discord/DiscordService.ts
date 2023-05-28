import Config from "@/app/Util/Config";
import { IDiscordAuth, IDiscordGuild, IDiscordUser } from "./IDiscord";
import axios from "axios";
import ProfileService from "../datamatrix/profiles/ProfileService";
import API from "@/app/Util/API";

export default class DiscordService {
    static url = "https://discord.com/api/"
    static cdn = "https://cdn.discordapp.com/"
    static authUrl = `https://discord.com/api/oauth2/authorize?client_id=1102067081115091055&redirect_uri=http%3A%2F%2F${Config.APP_HOST}%3A${Config.APP_PORT}%2Fdashboard%2Fprofile-register&response_type=code&scope=identify%20guilds%20guilds.members.read%20guilds.join%20gdm.join%20connections%20email`;

    constructor(){}

    static async authenticate(code: string) {
        try {
            const params = new URLSearchParams({
                client_id: "1102067081115091055", 
                client_secret: "61cmsrZc00EJD1s59azSmwXI1odOSZfz", 
                grant_type: "authorization_code", 
                code: code, 
                redirect_uri: `http://${Config.APP_HOST}:${Config.APP_PORT}/dashboard/profile-register`, 
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

    static async getDiscordUser(access_token?: string) {
        try {
            let accessToken = "";
            if(!!access_token)
            {
                accessToken = access_token;
                console.log("CERTO");
            } else {
                accessToken = (await ProfileService.getById(1)).discord_api_token;
            }

            const response: Array<any> = await API.get({url: `${this.url}users/@me/guilds?with_counts=true`, headers: {
                Authorization: `Bearer ${accessToken}`
            }}
            )
            console.log(response);

            const userGuilds = response.map((guild: any): IDiscordGuild => {
                const image = new Image();
                image.src = `${this.cdn}icons/${guild.id}/${guild.icon}.png`
                const response = {icon: guild.icon, id: guild.id, name: guild.name, owner: guild.owner, image: image, approximate_member_count: guild.approximate_member_count};
                return response
        })
    
            const user = await API.get<IDiscordUser>({url: `${this.url}users/@me`, headers: {
                Authorization: `Bearer ${accessToken}`
            }}
            )
            
            const userResponse: IDiscordUser = {...user, guilds: userGuilds}
            return userResponse;
        }
        catch {
            const user: IDiscordUser = {} as IDiscordUser
            return user;
        }
    }
}