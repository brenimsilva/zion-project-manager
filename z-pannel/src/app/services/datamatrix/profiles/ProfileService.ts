import API from "@/app/Util/API";
import DiscordService from "../../discord/DiscordService";
import { IDMProfile, IDMProfileDTO } from "../../../Util/Interfaces";
import DataMatrixService from "../DataMatrixService";
export default class ProfileService extends DataMatrixService{
    private static resource = "profile";

    static async getById(id: number): Promise<IDMProfile> {
        const response = await API.get<IDMProfile>({url: `${this.baseUrl}${this.resource}/${id}`});
        return response;
    }
    static async updateProfile(profile: IDMProfile) {
        const response = await API.put({url: `${this.baseUrl}${this.resource}`, body: profile});
        return response;
    }

    static async add(profile: IDMProfileDTO) {
        const response = await API.post({url: `${this.baseUrl}${this.resource}`, body: profile});
        return response;
    }
}