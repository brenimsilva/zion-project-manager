import { IDMProfile } from "../services/datamatrix/profiles/Interfaces";

export interface IRequestParams {
    url: string;
    method?: "POST" | "GET" | "PUT" | "DELETE";
    headers?: any;
    body?: any;
}

export default class API {
    constructor() {}

    static async get<T>({url, headers}: IRequestParams) {
        return this._sendRequest<T>({url, method:"GET", headers});
    }

    static async post({url, body, headers}: IRequestParams) {
        const bodyJson = JSON.stringify(body);
        return this._sendRequest({url, method:"POST", body:bodyJson, headers});
    }
    
    static async put({url, body, headers}: IRequestParams) {
        const bodyJson = JSON.stringify(body);
        return this._sendRequest({url, method:"PUT", body:bodyJson});
    }

    static async delete({url, body, headers}: IRequestParams) {
        const bodyJson = JSON.stringify(body);
        return this._sendRequest({url, method:"DELETE", body:bodyJson, headers});
    }

    static async _sendRequest<T>({url, method, body, headers}: IRequestParams): Promise<T> {
        // const params = {...body, ...headers};

        const response = await fetch(url, {method: method, headers: {"Content-Type": "application/json", ...headers}, body: body});
        const responseJson = await response.json();
        return responseJson;
    }
}