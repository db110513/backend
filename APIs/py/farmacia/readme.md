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


mkdir routes

