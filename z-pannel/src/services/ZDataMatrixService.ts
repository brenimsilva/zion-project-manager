import axios from "axios";
import { IDiscordUser } from "./DiscordService";

export default class ZDataMatrix {
    constructor() {}

    static insertUser(user: any) {
        const final = JSON.stringify(user);
        console.log(final)
        fetch("http://localhost:8000/insert-user", {body: final, method: "POST"}).then((data) => {
            return data.json();
        }).then((response) => {
            console.log(response);
        });
        
    }
}