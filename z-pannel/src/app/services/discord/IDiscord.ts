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
    approximate_member_count: number;
    joined_at?: Date;
}

export interface IDiscordUser {
    avatar: string;
    id: string;
    username: string;
    guilds: Array<IDiscordGuild>
}