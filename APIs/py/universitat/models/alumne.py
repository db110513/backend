from . import db

class Alumne(db.Model):
    DNI = db.Column(db.String(10), primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Alumne {self.nom}>'
