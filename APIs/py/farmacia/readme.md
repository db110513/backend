Directori root:
```
mkdir ...
cd ...
code .
```

Crea un entorn virtual:
```
python -m venv env
```

Activa'l:

Windows:
```
.\env\Scripts\activate
```

Linux:
```
source env/bin/activate
```
Flask:
```
pip install flask
flask
pip freeze > requirements.txt
```


app.py
```

from flask import Flask, jsonify

from routes.medicaments import medicaments_bp
from routes.comandes import comandes_bp
from routes.clients import clients_bp

app = Flask(__name__)

app.register_blueprint(medicaments_bp, url_prefix='/medicaments')
app.register_blueprint(comandes_bp, url_prefix='/comandes')
app.register_blueprint(clients_bp, url_prefix='/clients')

@app.route('/')
def benvinguda():
    return jsonify({"missatge": "Benvingut a l'API de la farmàcia!"})

if __name__ == '__main__':
    app.run(debug=True)

```

Executa l'API:
```
python app.py
```

routes/clients.py
```
from flask import Blueprint, request, jsonify

clients_bp = Blueprint('clients', __name__)

clients = [
    {"id": 1, "nom": "Joan", "email": "joan@example.com"},
    {"id": 2, "nom": "Maria", "email": "maria@example.com"}
]


@clients_bp.route('/', methods=['GET'])
def obtenir_clients():
    return jsonify(clients)


@clients_bp.route('/<int:id>', methods=['GET'])
def obtenir_client(id):
    client = next((c for c in clients if c["id"] == id), None)
    if client is None:
        return jsonify({"missatge": "Client no trobat"}), 404
    return jsonify(client)


@clients_bp.route('/', methods=['POST'])
def crear_client():
    dades_noves = request.get_json()
    if not dades_noves.get('nom') or not dades_noves.get('email'):
        return jsonify({"missatge": "El nom i l'email són obligatoris"}), 400
    
    nou_client = {
        "id": len(clients) + 1,
        "nom": dades_noves["nom"],
        "email": dades_noves["email"]
    }
    
    clients.append(nou_client)
    return jsonify(nou_client), 201


@clients_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_client(id):
    client = next((c for c in clients if c["id"] == id), None)
    
    if client is None:
        return jsonify({"missatge": "Client no trobat"}), 404
    
    dades_actualitzades = request.get_json()
    
    client['nom'] = dades_actualitzades.get('nom', client['nom'])
    client['email'] = dades_actualitzades.get('email', client['email'])
    
    return jsonify(client)
    

@clients_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_client(id):
    global clients
    client = next(c for c in clients if c["id"] == id), None
```

routes/comandes.py
```
from flask import Blueprint, request, jsonify

comandes_bp = Blueprint('comandes', __name__)

comandes = [
    {"id": 1, "medicament_id": 1, "quantitat": 3, "client_id": 1},
    {"id": 2, "medicament_id": 2, "quantitat": 2, "client_id": 2}
]

@comandes_bp.route('/', methods=['GET'])
def obtenir_comandes():
    return jsonify(comandes)


@comandes_bp.route('/<int:id>', methods=['GET'])
def obtenir_comanda(id):
    comanda = next((c for c in comandes if c["id"] == id), None)
    if comanda is None:
        return jsonify({"missatge": "Comanda no trobada"}), 404
    return jsonify(comanda)


@comandes_bp.route('/', methods=['POST'])
def crear_comanda():
    dades_noves = request.get_json()
    if not dades_noves.get('medicament_id') or not dades_noves.get('quantitat') or not dades_noves.get('client_id'):
        return jsonify({"missatge": "Tots els camps són obligatoris"}), 400
    
    nova_comanda = {
        "id": len(comandes) + 1,
        "medicament_id": dades_noves["medicament_id"],
        "quantitat": dades_noves["quantitat"],
        "client_id": dades_noves["client_id"]
    }
    
    comandes.append(nova_comanda)
    return jsonify(nova_comanda), 201


@comandes_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_comanda(id):
    comanda = next((c for c in comandes if c["id"] == id), None)
    
    if comanda is None:
        return jsonify({"missatge": "Comanda no trobada"}), 404
    
    dades_actualitzades = request.get_json()
    
    comanda['medicament_id'] = dades_actualitzades.get('medicament_id', comanda['medicament_id'])
    comanda['quantitat'] = dades_actualitzades.get('quantitat', comanda['quantitat'])
    comanda['client_id'] = dades_actualitzades.get('client_id', comanda['client_id'])
    
    return jsonify(comanda)


@comandes_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_comanda(id):
    global comandes
    comanda = next((c for c in comandes if c["id"] == id), None)
    
    if comanda is None: return jsonify({"missatge": "Comanda no trobada"}), 404
    
    comandes = [c for c in comandes if c["id"] != id]
    return jsonify({"missatge": "Comanda eliminada"}), 200

```

routes/medicaments.py
```
from flask import Blueprint, request, jsonify

medicaments_bp = Blueprint('medicaments', __name__)

medicaments = [
    {"id": 1, "nom": "Paracetamol", "preu": 3.83},
    {"id": 2, "nom": "Ibuprofèn", "preu": 4.3}
]

@medicaments_bp.route('/', methods=['GET'])
def obtenir_medicaments():
    return jsonify(medicaments)

@medicaments_bp.route('/<int:id>', methods=['GET'])
def obtenir_medicament(id):
    medicament = next((m for m in medicaments if m["id"] == id), None)
    if medicament is None:
        return jsonify({"missatge": "Medicament no trobat"}), 404
    return jsonify(medicament)

@medicaments_bp.route('/', methods=['POST'])
def crear_medicament():
    dades_noves = request.get_json()
    if not dades_noves.get('nom') or not dades_noves.get('preu'):
        return jsonify({"missatge": "El nom i el preu són obligatoris"}), 400
    
    # Creem un nou medicament amb l'ID incrementat automàticament
    nou_medicament = {
        "id": len(medicaments) + 1,
        "nom": dades_noves["nom"],
        "preu": dades_noves["preu"]
    }
    
    medicaments.append(nou_medicament)
    return jsonify(nou_medicament), 201

@medicaments_bp.route('/<int:id>', methods=['PUT'])
def actualitzar_medicament(id):
    medicament = next((m for m in medicaments if m["id"] == id), None)
    
    if medicament is None:
        return jsonify({"missatge": "Medicament no trobat"}), 404
    
    dades_actualitzades = request.get_json()
    
    medicament['nom'] = dades_actualitzades.get('nom', medicament['nom'])
    medicament['preu'] = dades_actualitzades.get('preu', medicament['preu'])
    
    return jsonify(medicament)

@medicaments_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_medicament(id):
    global medicaments
    medicament = next((m for m in medicaments if m["id"] == id), None)
    
    if medicament is None:
        return jsonify({"missatge": "Medicament no trobat"}), 404
    
    medicaments = [m for m in medicaments if m["id"] != id]
    return jsonify({"missatge": "Medicament eliminat"}), 200

```










