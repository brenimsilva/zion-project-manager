import axios, { AxiosHeaders } from "axios";
import DataMatrixService from "../DataMatrixService";
import Config from "@/app/Util/Config";
import API from "@/app/Util/API";
import { DMUserProjection } from "@/app/projections/DMProjections";

interface ILoginProps {
    login: string;
    password: string;
}

interface IUserAuth {

}

export default class AuthService extends DataMatrixService
{
    private static _resource = "auth";
    constructor(){
        super();
    }

    static async login({login, password}: ILoginProps): Promise<{message: string, token: string, user: DMUserProjection}> 
    {
        const body = {login: login, password: password};
        const {message, data} = await API.post<{message: string, data: string}>({url: this.baseUrl + this._resource, body});
        
        const user = await API.post<DMUserProjection>({url: this.baseUrl + "decode",  body: data});
        
        
        return {message: message, token: data, user: user};
    }

    static async recoverUserInfo(token: string) {
        const response = await (await axios.post(this.baseUrl + "decode", {data: token})).data;
        return response;
    }

    static async auth() {
        const token = localStorage.getItem("datamatrix.token");
        if (token === null) return false;

        const data = await this.recoverUserInfo(token);
        if(data.error) return false;
        else return data;
        // location.href = `/dashboard`;
    }

}