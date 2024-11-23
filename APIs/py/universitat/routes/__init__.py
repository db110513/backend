from .alumnes import alumnes_bp
from .assignatures import assignatures_bp
from .matricules import matricules_bp
from .professors import professors_bp

def register_blueprints(app):
    app.register_blueprint(alumnes_bp, url_prefix='/alumnes')
    app.register_blueprint(assignatures_bp, url_prefix='/assignatures')
    app.register_blueprint(matricules_bp, url_prefix='/matricules')
    app.register_blueprint(professors_bp, url_prefix='/professors')
