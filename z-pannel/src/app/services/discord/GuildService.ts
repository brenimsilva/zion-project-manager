import axios from "axios";
import DiscordService from "./DiscordService";
import { IDiscordGuild, IDiscordUser } from "./IDiscord";

export default class GuildService extends DiscordService {
    constructor() {
        super();
    }

    static async getUserData(): Promise<IDiscordUser> {
        try {
            const userGuilds: Array<IDiscordGuild> = await (await axios.get(`${this.url}users/@me/guilds?with_counts=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })).data.map((guild: any): IDiscordGuild => {
                    const image = new Image();
                    image.src = `${this.cdn}icons/${guild.id}/${guild.icon}.png`
                    const response = {icon: guild.icon, id: guild.id, name: guild.name, owner: guild.owner, image: image, approximate_member_count: guild.approximate_member_count};
                    return response
            })
    
            const {avatar, username, id} = await (await axios.get(`${this.url}users/@me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })).data
            
            const user: IDiscordUser = {id, username, avatar, guilds: userGuilds}
            return user;
        }
        catch {
            const user: IDiscordUser = {avatar: "", guilds: [], id: "", username: ""}
           
            
            return user;
        }
    }

    static async leaveGuilds(listIds: Array<string>) {
        try {
            listIds.forEach((id) => {
                axios.delete(`${this.url}users/@me/guilds/${id}`).then((response) => {
                    console.log(`Left guild id: ${id}`)
                    console.log(response);
                })
            })
        }
        catch {
            return false;
        }
    }

    static async getGuildMemberInfo(guild_id: string): Promise<any> {
        const url = `${this.url}users/@me/guilds/${guild_id}/member`
        try {
            const data = await (await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })).data

            return data

        }
        catch {
            return null
        }
    }
}