from flask import Blueprint, request, jsonify

matricules_bp = Blueprint('matricules', __name__)

# Dades d'exemple
matricules = [
    {"id": 1, "alumne_DNI": "12345678A", "assignatura_id": 1},
    {"id": 2, "alumne_DNI": "87654321B", "assignatura_id": 2}
]

@matricules_bp.route('/', methods=['GET'])
def obtenir_matricules():
    return jsonify(matricules)

@matricules_bp.route('/<int:id>', methods=['GET'])
def obtenir_matricula(id):
    matricula = next((m for m in matricules if m["id"] == id), None)
    if matricula is None:
        return jsonify({"missatge": "Matrícula no trobada"}), 404
    return jsonify(matricula)

@matricules_bp.route('/', methods=['POST'])
def crear_matricula():
    dades_noves = request.get_json()
    if not dades_noves.get('alumne_DNI') or not dades_noves.get('assignatura_id'):
        return jsonify({"missatge": "El DNI de l'alumne i l'ID de l'assignatura són obligatoris"}), 400

    nova_matricula = {
        "id": len(matricules) + 1,
        "alumne_DNI": dades_noves["alumne_DNI"],
        "assignatura_id": dades_noves["assignatura_id"]
    }

    matricules.append(nova_matricula)
    return jsonify(nova_matricula), 201

@matricules_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_matricula(id):
    matricula = next((m for m in matricules if m["id"] == id), None)

    if matricula is None:
        return jsonify({"missatge": "Matrícula no trobada"}), 404

    dades_actualitzades = request.get_json()

    matricula['alumne_DNI'] = dades_actualitzades.get('alumne_DNI', matricula['alumne_DNI'])
    matricula['assignatura_id'] = dades_actualitzades.get('assignatura_id', matricula['assignatura_id'])

    return jsonify(matricula)

@matricules_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_matricula(id):
    global matricules
    matricules = [m for m in matricules if m["id"] != id]
    return jsonify({"missatge": "Matrícula eliminada"}), 200
