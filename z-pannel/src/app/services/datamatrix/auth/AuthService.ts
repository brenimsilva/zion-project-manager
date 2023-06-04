import axios, { AxiosHeaders } from "axios";
import DataMatrixService from "../DataMatrixService";
import Config from "@/app/Util/Config";
import API from "@/app/Util/API";
import { DMUserProjection } from "@/app/projections/DMProjections";
import { setCookie } from "nookies";
import { TIME } from "@/app/Util/Constantes";

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

    static async login({login, password}: ILoginProps): Promise<{message: string, token: string, user: DMUserProjection} | {error: string}> 
    {
        const body = {login: login, password: password};
        const {message, data: token, error} = await API.post<{message: string, data: string, error?: string}>({url: this.baseUrl + this._resource, body});
        
        const user = await this.recoverUserInfo(token);
        if(!!error) {
            return {error}
        } 
        setCookie(undefined, "datamatrix.token", token, {maxAge: TIME.oneHour});
        return {message: message, token: token, user: user};

    }

    static async recoverUserInfo(token: string): Promise<DMUserProjection> {
        const response = await API.post<DMUserProjection>({url: this.baseUrl + "decode",  body: token});
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