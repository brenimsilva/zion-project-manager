from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from Planilha import Planilha
app = Flask(__name__)
CORS(app)

listaDados = [
    {
        'id': 1,
        'titulo': 'teste titulo',
        'dados': 'teste'
    },
    {
        'id': 2,
        'titulo': 'teste titulo 2',
        'dados': 'teste 2'
    }
]

planilha = Planilha()


@app.route("/update", methods=["GET"])
def update():
    return jsonify({"data": planilha.execute(planilha.atualizarTabela)})




@app.route("/teste", methods=["GET"])
def get():
    return jsonify(listaDados)

@app.route("/pega/<int:id>", methods=["GET"])
def getById(id):
    for item in listaDados:
        if(item.get("id") == id):
            return jsonify(item) 
        
@app.route("/add", methods=["POST"])
def addItem():
    novoItem = request.get_json()
    listaDados.append(novoItem)
    return jsonify(listaDados)

@app.route("/edit/<int:id>", methods=["PUT"])
def editItem(id):
    itemEditado = request.get_json()
    for index, item in enumerate(listaDados):
        if(item.get('id') == id):
            listaDados[index].update(itemEditado)
            return jsonify(listaDados[index])

@app.route("/delete/<int:id>", methods=["DELETE"])
def deleteItem(id):
    for index, item in enumerate(listaDados):
        if(item.get("id") == id):
            listaDados.pop(index) # del listaDados[index]
            return jsonify(listaDados)
        
app.run(port=5000, host='localhost', debug=True)