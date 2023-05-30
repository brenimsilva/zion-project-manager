
interface IDMProfile{
    id: number;
    id_user: number;
    username: string;
    discord_username: string;
    discord_id: string;
    discord_email: string;
    discord_api_token: string;
    discord_avatar: string;
    date_inserted: Date;
    last_updated: Date;
}

interface IDMProfileDTO {
    id_user: number;
    username: string;
    discord_username: string;
    discord_id: string;
    discord_email: string;
    discord_api_token: string;
    discord_avatar: string;
}

interface IDiscordGuild {
    approximate_member_count: number;
    approximate_presence_count: number;
    features: Array<any>;
    icon: string;
    id: string;
    name: string;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    joined_at?: Date;
    imageSrc?: string;
}

export interface IDiscordAuth {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export interface IDiscordUser {
    avatar: string;
    id: string;
    username: string;
    guilds?: Array<IDiscordGuild>;
    discriminator: string;
    verified: boolean;
    email: string;
    flags: number;
    banner: string;
    accent_color: number;
    premium_type: number;
    public_flags: number;
}



export type {IDMProfile, IDMProfileDTO, IDiscordGuild}