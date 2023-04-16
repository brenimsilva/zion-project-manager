import requests
from typing import List
import asyncio
import aiohttp
import concurrent.futures

class Request:
    def __init__(self) -> None:
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

        return data

    def getArrayFloorPrices(self, nft_list: List[object]) -> List[object]:
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
                results.append([result])
        return results
