import axios from "axios";
import DiscordService, { IDiscordGuild, IDiscordUser } from "./DiscordService";

export default class GuildService extends DiscordService {
    constructor() {
        super();

    }

    static async getGuilds(): Promise<IDiscordUser> {
        const userGuilds: Array<IDiscordGuild> = await (await axios.get(`${this.url}users/@me/guilds?with_counts=true`, {
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`
            }
        })).data.map((guild: any): IDiscordGuild => {
                const image = new Image();
                image.src = `${this.cdn}icons/${guild.id}/${guild.icon}.png`
                const response = {icon: guild.icon, id: guild.id, name: guild.name, owner: guild.owner, image: image, approximate_member_count: guild.approximate_member_count};
                console.log(response);
                return response
        })

        const {avatar, username, id} = await (await axios.get(`${this.url}users/@me`, {
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`
            }
        })).data
        
        const user: IDiscordUser = {id, username, avatar, guilds: userGuilds}
        return user;
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
}