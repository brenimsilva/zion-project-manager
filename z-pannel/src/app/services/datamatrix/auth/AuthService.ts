import axios, { AxiosHeaders } from "axios";
import DataMatrixService from "../DataMatrixService";
import Config from "@/app/Util/Config";

interface ILoginProps {
    login: string;
    password: string;
}

export default class AuthService extends DataMatrixService
{
    private static _resource = "auth";
    constructor(){
        super();
    }

    static async login({login, password}: ILoginProps): Promise<any> 
    {
        const body = JSON.stringify({login: login, password: password})
        const response = await fetch(this.baseUrl + this._resource, {method: "POST", body: body});
        const data = await response.json();
        const token = JSON.stringify({data: data.data});
        const user = await (await fetch(this.baseUrl + "decode", {method: "POST", body: token})).json();
        
        
        return {message: data.message, token: data.data, user: user};
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