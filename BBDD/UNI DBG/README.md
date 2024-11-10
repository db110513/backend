```
CREATE SCHEMA uni_dbg;

CREATE TABLE UNI_DBG.Graus (
    grau_id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE UNI_DBG.Cursos (
    curs_id SERIAL PRIMARY KEY,
    grau_id INTEGER NOT NULL,
    nom_curs VARCHAR(10) NOT NULL,
    FOREIGN KEY (grau_id) REFERENCES UNI_DBG.Graus(grau_id)
);

CREATE TABLE UNI_DBG.Estudiants (
    estudiant_id SERIAL PRIMARY KEY,
    nom_estudiant VARCHAR(50) NOT NULL,
    cognoms_estudiant VARCHAR(50) NOT NULL,
    data_naixement DATE NOT NULL,
    curs_id INTEGER NOT NULL,
    FOREIGN KEY (curs_id) REFERENCES UNI_DBG.Cursos(curs_id)
);

CREATE TABLE UNI_DBG.Assignatures (
    assignatura_id SERIAL PRIMARY KEY,
    curs_id INTEGER NOT NULL,
    nom_assignatura VARCHAR(100) NOT NULL,
    FOREIGN KEY (curs_id) REFERENCES UNI_DBG.Cursos(curs_id)
);

CREATE TABLE UNI_DBG.Notes (
    nota_id SERIAL PRIMARY KEY,
    estudiant_id INTEGER NOT NULL,
    assignatura_id INTEGER NOT NULL,
    nota DECIMAL(4, 2),
    FOREIGN KEY (estudiant_id) REFERENCES UNI_DBG.Estudiants(estudiant_id),
    FOREIGN KEY (assignatura_id) REFERENCES UNI_DBG.Assignatures(assignatura_id)
);

CREATE TABLE UNI_DBG.Assistencia (
    assistencia_id SERIAL PRIMARY KEY,
    estudiant_id INTEGER NOT NULL,
    assignatura_id INTEGER NOT NULL,
    data DATE NOT NULL,
    present BOOLEAN NOT NULL,
    FOREIGN KEY (estudiant_id) REFERENCES UNI_DBG.Estudiants(estudiant_id),
    FOREIGN KEY (assignatura_id) REFERENCES UNI_DBG.Assignatures(assignatura_id)
);
```
