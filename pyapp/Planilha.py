from __future__ import print_function
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from Request import Request
import os.path
from dotenv import load_dotenv
from termcolor import colored
from CustomMessage import CustomMessage

class Planilha:
    def __init__(self) -> None:
        load_dotenv()
        self.cm = CustomMessage()
        self.request = Request()
        self.SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

        #ATUALIZAR CAMPO NO ARQUIVO .EVN
        self.SHEET_NAME = os.environ.get("SHEET_NAME")
        self.SHEET_ID = os.environ.get("SHEET_ID")
        self.CELL_START_INTERVAL = os.environ.get("CELL_START_INTERVAL")
        self.CELL_END_INTERVAL = os.environ.get("CELL_END_INTERVAL")
        self.CELL_TO_WRITE = os.environ.get("CELL_TO_WRITE")

        self.SAMPLE_RANGE_NAME = f"{self.SHEET_NAME}!{self.CELL_START_INTERVAL}{':' + self.CELL_END_INTERVAL}"
        self.SAMPLE_SPREADSHEET_ID = self.SHEET_ID


        #INICIALIZANDO PLANILHA
        creds = None
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', self.SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'client_secret.json', self.SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        service = build('sheets', 'v4', credentials=creds)
        self.sheet = service.spreadsheets()

    def __escreverValor(self, valor, celula):
        self.sheet.values().update(spreadsheetId=self.SAMPLE_SPREADSHEET_ID, range=celula,
                            valueInputOption="USER_ENTERED", body={'values': valor}).execute()

    def __getSheetValues(self, sheet_range):
        result = self.sheet.values().get(spreadsheetId=self.SAMPLE_SPREADSHEET_ID,
                                    range=sheet_range).execute()
        values = result.get('values', [])
        return values

    def updateNftValues(self):
        values = self.__getSheetValues(f"{self.SAMPLE_RANGE_NAME}")
        listaFinal = []
        nft_redes = []
        
        for index, row in enumerate(values):
            nft = row[0]
            rede = row[2]
            nft_redes.append({"symbol": nft, "rede": rede, "index": index})
        
        listaResponse = self.request.getArrayFloorPrices(nft_redes)
        sorted_nft_list = sorted(listaResponse, key=lambda x: x["index"])

        self.cm.c_log("Iniciando processo de ordenacao dos nfts no array")

        for nft in sorted_nft_list:
            value = colored(nft['value'], "green")
            msg = f"{nft['symbol']} => {nft['rede']} => {value}"
            print(msg)
            print("\n")
            listaFinal.append([nft['value']])
        
        write_cell = f"{self.SHEET_NAME}!{self.CELL_TO_WRITE}"
        self.__escreverValor(listaFinal, write_cell)
        return values

    def convertCryptoToUsd(self, crypto):
        cryptoToUsd = self.request.getCryptoUsdPrice({"index": 0, "symbol": crypto})
        return {"symbol": cryptoToUsd['symbol'], "value": cryptoToUsd["value"]}

    def updateCryptoValues(self):
        sheet_name = os.environ.get("CRYPTO_SHEET_NAME")
        cell_start_interval = os.environ.get("CRYPTO_CELL_START_INTERVAL")
        cell_end_interval = os.environ.get("CRYPTO_CELL_END_INTERVAL")
        self.SAMPLE_RANGE_NAME=f"{sheet_name}!{cell_start_interval}:{cell_end_interval}"
        values = self.__getSheetValues(f"{self.SAMPLE_RANGE_NAME}")

        listCryptoObjects = []
        for index, cArr in enumerate(values):
            listCryptoObjects.append({"index": index, "symbol": cArr[2]})

        retorno = self.request.getCryptoUsdPrices(listCryptoObjects)
        sorted_crypto_list = sorted(retorno, key=lambda x: x["index"])
        listToWrite = []
        for crypto in sorted_crypto_list:
            listToWrite.append([crypto["value"]])

        print(listToWrite)
        range = f"{sheet_name}!{os.environ.get('CRYPTO_CELL_TO_WRITE')}"
        self.__escreverValor(listToWrite, range)
        return sorted_crypto_list

