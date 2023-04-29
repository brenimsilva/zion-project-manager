import requests
from typing import List
import concurrent.futures
from CustomMessage import CustomMessage

class Request:
    def __init__(self) -> None:
        self.cm = CustomMessage()
        pass

    def getFloorPrice(self, nft):
        payload = {}
        uri = ""
        divisaoPor = 0
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'}
        ending = ""
        ###############################
        match nft['rede']:
            case "solana":
                uri = "http://api-mainnet.magiceden.dev/v2/collections/"
                divisaoPor = 1000000000
                ending = "/stats"

            case "polygon":
                uri =  "https://polygon-api.magiceden.io/v2/xc/collections/polygon/"
                divisaoPor = 1000000000000000000
                ending = "/stats"

            case "ethereum":
                uri = "https://api.opensea.io/collection/"
                divisaoPor = 1
                ending = "?format=json"

        #################################
        
        url = f"{uri}{nft['symbol']}{ending}".format(
            symbol=nft['symbol'].lower().replace(" ", "_"))
        response = requests.request("GET", url, headers=headers, data=payload)
        if(nft['rede'] == "ethereum"):
            data = float(response.json()["collection"]["stats"]["floor_price"])
        else: 
            data = float(response.json()['floorPrice']) / divisaoPor
        
        retorno = {"symbol": nft['symbol'], "rede": nft['rede'], "value": data, "index": nft['index'], "url": url}

        return retorno

    def getArrayFloorPrices(self, nft_list: List[object]) -> List[object]:
        self.cm.c_log("Pegando floor prices em concurrency")
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {executor.submit(self.getFloorPrice, nft): nft for nft in nft_list}
        results = []
        for future in concurrent.futures.as_completed(futures):
            url = futures[future]
            try:
                result = future.result()
            except Exception as exc:
                print(exc)
            else:
                results.append(result)
        self.cm.c_log("Retornando os resultados de getArrayFloorPrices")
        return results

    def getCryptoUsdPrice(self, crypto):
        self.cm.c_log(f"Pegando preço de {crypto}")
        headers = {}
        payload = {}
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=usd"
        response = requests.request("GET", url, headers=headers, data=payload)
        return response.json()[crypto]