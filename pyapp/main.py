from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Planilha import Planilha
app = Flask(__name__)
CORS(app)

planilha = Planilha()

@app.route("/update", methods=["GET"])
def update():
    return jsonify({"data": planilha.execute(planilha.atualizarTabela)})

@app.route("/crypto-to-usd/<crypto>", methods=["GET"])
def cryptoToUsd(crypto):
    return planilha.convertCryptoToUsd(crypto)
        
app.run(port=5000, host='localhost', debug=True)