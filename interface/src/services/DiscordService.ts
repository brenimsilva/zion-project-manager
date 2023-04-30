export default class DiscordService {
    constructor(){}
    static async getUserInfo() {
        const promise = await fetch("")
        const data = await promise.json();
        return data;
    }
}