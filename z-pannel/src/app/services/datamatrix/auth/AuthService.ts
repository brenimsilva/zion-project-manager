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
        const response = await fetch(this.baseUrl + this._resource)
        const data = await response.json();
        console.log(data);
    }

}