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
        return data;
    }

    static async recoverUserInfo(token: string) {
        const response = await (await axios.post(this.baseUrl + this._resource + "0", {data: token})).data;
        return response;
    }

    static async auth() {
        const token = localStorage.getItem("datamatrix.token");
        if (token === null) return false;

        const data = await this.recoverUserInfo(token);
        if(data.errors) return false;
        else return data;
        // location.href = `/dashboard`;
    }

}