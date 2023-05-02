export interface IUpdateTabelaResponse {
    data: any,
    message: string,
    error: string
}
export default class PlanilhaService {
    constructor() {}
    static async updateNFTValues(): Promise<IUpdateTabelaResponse> {
        try {
          const response = await fetch("http://localhost:5000/update-nft-values");
          const data = await response.json();
          return ({data: data, message: "Planilha atualizada com sucesso!", error: "" });
        } catch {
          return({data: null, message: "", error: "Falha ao atualizar planilha" });
        }
      }

      static async updateCryptoValues(): Promise<IUpdateTabelaResponse> {
        try {
          const response = await fetch("http://localhost:5000/update-crypto-values");
          const data = await response.json();
          return ({data: data, message: "Planilha atualizada com sucesso!", error: "" });
        } catch {
          return({data: null, message: "", error: "Falha ao atualizar planilha" });
        }
      }

      
}