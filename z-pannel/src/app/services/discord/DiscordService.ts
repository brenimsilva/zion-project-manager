import Config from "@/app/Util/Config";
import { IDiscordAuth, IDiscordGuild, IDiscordUser } from "../../Util/Interfaces";
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
            }).toString();
            const headers = {
                'Content-Type':  'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/x-www-form-urlencoded'
            }
            const response: IDiscordAuth = await API.post<IDiscordAuth>({url: `${this.url}oauth2/token` + params, headers})
            // localStorage.setItem("access_token", response.access_token);
            // console.log(localStorage.getItem("access_token"));
            console.log(`User Authenticated successfuly!`);
            return response.access_token;
        }
        catch {
            return false;
        }
    }

    static async getDiscordUserWithGuilds(access_token?: string) {
        try {
            let accessToken = await this._getAccessToken(access_token);
       
            const userGuilds: Array<IDiscordGuild> = await this.getUserGuildList(accessToken);
    
            const user = await this.getDiscordUser(accessToken);
            
            const userWithGuilds: IDiscordUser = {...user, guilds: userGuilds}
            return userWithGuilds;
        }
        catch {
            const user: IDiscordUser = {} as IDiscordUser
            return user;
        }
    }

    private static async _getAccessToken(access_token?: string) {
        if(!!access_token)
        {
            return access_token;
        } 
        return (await ProfileService.getById(7)).discord_api_token;
    }

    public static async getUserGuildList(access_token: string): Promise<Array<IDiscordGuild>> {
        try {
            const response = await API.get<Array<IDiscordGuild>>({url: `${this.url}users/@me/guilds?with_counts=true`, headers: {
                Authorization: `Bearer ${access_token}`
            }}
            )
            if(response.code !== 0)
            {
                const data = response.map((guild): IDiscordGuild => {
                    const imageSrc = `${this.cdn}icons/${guild.id}/${guild.icon}.png`
                    const response: IDiscordGuild = {...guild, imageSrc: imageSrc};
                    return response
                })
                return data;
            }
            this.authenticate(access_token);
            return null;
        } 
        catch (error) 
        {
            return error;   
        }
    }

    public static async getDiscordUser(access_token: string): Promise<IDiscordUser>
    {
        const response = await API.get<IDiscordUser>({url: `${this.url}users/@me`, headers: {
            Authorization: `Bearer ${access_token}`
        }}
        )

        return response;
    }

    static async leaveGuilds(listIds: Array<string>) {
        try {
            let accessToken = await this._getAccessToken(undefined);
            await listIds.forEach((id) => {
                axios.delete(`${this.url}users/@me/guilds/${id}`, {data: JSON.stringify({lurking: false}),
                 headers: {
                    Authorization: `MTEwODE1MzU4OTI5MTA0NDg4NA.GRfkeo.fHHE5uYBx5UJmPqUIb8lt7gVWUFjERgb23WQgQ`
                } }).then((response) => {
                    console.log(`Left guild id: ${id}`)
                    console.log(response);
                })
            })
        }
        catch {
            return false;
        }
    }
}