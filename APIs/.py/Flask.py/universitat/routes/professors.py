from flask import Blueprint, request, jsonify

professors_bp = Blueprint('professors', __name__)

# Dades d'exemple
professors = [
    {"id": 1, "nom": "Prof. Joan", "email": "joan@example.com"},
    {"id": 2, "nom": "Prof. Maria", "email": "maria@example.com"}
]

@professors_bp.route('/', methods=['GET'])
def obtenir_professors():
    return jsonify(professors)

@professors_bp.route('/<int:id>', methods=['GET'])
def obtenir_professor(id):
    professor = next((p for p in professors if p["id"] == id), None)
    if professor is None:
        return jsonify({"missatge": "Professor no trobat"}), 404
    return jsonify(professor)

@professors_bp.route('/', methods=['POST'])
def crear_professor():
    dades_noves = request.get_json()
    if not dades_noves.get('nom') or not dades_noves.get('email'):
        return jsonify({"missatge": "El nom i l'email són obligatoris"}), 400

    nou_professor = {
        "id": len(professors) + 1,
        "nom": dades_noves["nom"],
        "email": dades_noves["email"]
    }

    professors.append(nou_professor)
    return jsonify(nou_professor), 201

@professors_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_professor(id):
    professor = next((p for p in professors if p["id"] == id), None)

    if professor is None:
        return jsonify({"missatge": "Professor no trobat"}), 404

    dades_actualitzades = request.get_json()

    professor['nom'] = dades_actualitzades.get('nom', professor['nom'])
    professor['email'] = dades_actualitzades.get('email', professor['email'])

    return jsonify(professor)

@professors_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_professor(id):
    global professors
    professors = [p for p in professors if p["id"] != id]
    return jsonify({"missatge": "Professor eliminat"}), 200
