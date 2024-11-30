from flask import Flask, Blueprint, request, jsonify

app = Flask(__name__)

assignatures_bp = Blueprint('assignatures', __name__)

# Dades d'exemple
assignatures = [
    {"id": 1, "nom": "Matemàtiques", "professor": "Prof. Joan"},
    {"id": 2, "nom": "Història", "professor": "Prof. Maria"}
]

@assignatures_bp.route('/', methods=['GET'])
def obtenir_assignatures():
    return jsonify(assignatures)

@assignatures_bp.route('/<int:id>', methods=['GET'])
def obtenir_assignatura(id):
    assignatura = next((a for a in assignatures if a["id"] == id), None)
    if assignatura is None:
        return jsonify({"missatge": "Assignatura no trobada"}), 404
    return jsonify(assignatura)

@assignatures_bp.route('/', methods=['POST'])
def crear_assignatura():
    dades_noves = request.get_json()
    if not dades_noves.get('nom') or not dades_noves.get('professor'):
        return jsonify({"missatge": "El nom i el professor són obligatoris"}), 400

    nova_assignatura = {
        "id": len(assignatures) + 1,
        "nom": dades_noves["nom"],
        "professor": dades_noves["professor"]
    }

    assignatures.append(nova_assignatura)
    return jsonify(nova_assignatura), 201

@assignatures_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_assignatura(id):
    assignatura = next((a for a in assignatures if a["id"] == id), None)

    if assignatura is None:
        return jsonify({"missatge": "Assignatura no trobada"}), 404

    dades_actualitzades = request.get_json()

    assignatura['nom'] = dades_actualitzades.get('nom', assignatura['nom'])
    assignatura['professor'] = dades_actualitzades.get('professor', assignatura['professor'])

    return jsonify(assignatura)

@assignatures_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_assignatura(id):
    global assignatures
    assignatures = [a for a in assignatures if a["id"] != id]
    return jsonify({"missatge": "Assignatura eliminada"}), 200

app.register_blueprint(assignatures_bp, url_prefix='/assignatures')

if __name__ == '__main__':
    app.run(debug=True)
