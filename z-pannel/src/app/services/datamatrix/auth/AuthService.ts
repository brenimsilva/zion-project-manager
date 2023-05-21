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
        console.log(data);
    }

    static async teste() {
        const body = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ1LCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbS5iciIsInVzZXJUeXBlIjoiYWRtaW4ifQ.Ep6pn_-zDEJrw49ei5OePNaygktMamAaXCreGWspqHw";
        const response = await (await axios.post(this.baseUrl + this._resource + "0", {data: body})).data;
        console.log(response);
    }

}