import axios, { AxiosHeaders } from "axios";
import DataMatrixService from "../DataMatrixService";

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

    static async auth({login, password}: ILoginProps) 
    {
        const body = JSON.stringify({login: login, password: password})
        const response = await fetch(this.baseUrl + this._resource, {method: "POST", body: body});
        const data = await response.json();
        return data;
    }

    static async teste(token: string) {
        const response = await (await axios.post(this.baseUrl + this._resource + "0", {data: token})).data;
        console.log(response);
    }

}