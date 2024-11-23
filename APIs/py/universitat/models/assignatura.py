from . import db

class Assignatura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    professor = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Assignatura {self.nom}>'
