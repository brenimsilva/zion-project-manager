import requests

class Request:
    def __init__(self) -> None:
        pass

    def getFloorPrice(self, symbol: str, rede: str)->str:
        payload = {}
        uri = ""
        divisaoPor = 0
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'}
        ending = ""
        ###############################
        match rede:
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
        
        url = f"{uri}{symbol}{ending}".format(
            symbol=symbol.lower().replace(" ", "_"))
        response = requests.request("GET", url, headers=headers, data=payload)
        print(response)
        print(url)
        if(rede == "ethereum"):
            data = float(response.json()["collection"]["stats"]["floor_price"])
        else: 
            data = float(response.json()['floorPrice']) / divisaoPor
        return data