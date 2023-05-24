
interface IDMProfile{
    id?: number;
    id_user: number;
    username: string;
    discord_username: string;
    discord_id: string;
    discord_email: string;
    discord_api_token: string;
    discord_avatar: string;
    date_inserted?: Date;
    last_updated?: Date;
}

export type {IDMProfile}