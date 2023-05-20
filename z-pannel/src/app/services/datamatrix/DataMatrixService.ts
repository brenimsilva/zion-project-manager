import Config from "@/app/Util/Config";

export default class DataMatrixService {
    protected static baseUrl: string = `http://${Config.DATAMATRIX_HOST}:${Config.DATAMATRIX_PORT}/`
    constructor() {}
}