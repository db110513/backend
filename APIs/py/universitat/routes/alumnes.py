from flask import Flask, Blueprint, request, jsonify

app = Flask(__name__)

alumnes_bp = Blueprint('alumnes', __name__)

# Dades d'exemple
alumnes = [
    {"id": 1, "nom": "Pere", "email": "pere@example.com", "DNI": "12345678A"},
    {"id": 2, "nom": "Anna", "email": "anna@example.com", "DNI": "87654321B"}
]

@alumnes_bp.route('/', methods=['GET'])
def obtenir_alumnes():
    return jsonify(alumnes)


@alumnes_bp.route('/<int:id>', methods=['GET'])
def obtenir_alumne(id):
    alumne = next((a for a in alumnes if a["id"] == id), None)
    if alumne is None:
        return jsonify({"missatge": "Alumne no trobat"}), 404
    return jsonify(alumne)


@alumnes_bp.route('/', methods=['POST'])
def crear_alumne():
    dades_noves = request.get_json()
    if not dades_noves.get('nom') or not dades_noves.get('email') or not dades_noves.get('DNI'):
        return jsonify({"missatge": "El nom, l'email i el DNI són obligatoris"}), 400

    nou_alumne = {
        "id": len(alumnes) + 1,
        "nom": dades_noves["nom"],
        "email": dades_noves["email"],
        "DNI": dades_noves["DNI"]
    }

    alumnes.append(nou_alumne)
    return jsonify(nou_alumne), 201


@alumnes_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_alumne(id):
    alumne = next((a for a in alumnes if a["id"] == id), None)

    if alumne is None:
        return jsonify({"missatge": "Alumne no trobat"}), 404

    dades_actualitzades = request.get_json()

    alumne['nom'] = dades_actualitzades.get('nom', alumne['nom'])
    alumne['email'] = dades_actualitzades.get('email', alumne['email'])
    alumne['DNI'] = dades_actualitzades.get('DNI', alumne['DNI'])

    return jsonify(alumne)


@alumnes_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_alumne(id):
    global alumnes
    alumnes = [a for a in alumnes if a["id"] != id]
    return jsonify({"missatge": "Alumne eliminat"}), 200

app.register_blueprint(alumnes_bp, url_prefix='/alumnes')

if __name__ == '__main__':
    app.run(debug=True)
