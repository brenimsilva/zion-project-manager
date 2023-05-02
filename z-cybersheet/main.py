from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Planilha import Planilha
app = Flask(__name__)
CORS(app)

planilha = Planilha()

@app.route("/update-nft-values", methods=["GET"])
def updateNftValues():
    return jsonify({"data": planilha.updateNftValues()})

@app.route("/crypto-to-usd/<crypto>", methods=["GET"])
def cryptoToUsd(crypto):
    return planilha.convertCryptoToUsd(crypto)

@app.route("/update-crypto-values", methods=["GET"])
def updateCryptoValues():
    return jsonify({"data": planilha.updateCryptoValues()})
        
app.run(port=5000, host='localhost', debug=True)