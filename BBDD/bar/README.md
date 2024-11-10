```
CREATE SCHEMA bar;

CREATE TABLE bar.Clients (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    cognoms VARCHAR(50) NOT NULL,
    telefon VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE bar.Productes (
    producte_id SERIAL PRIMARY KEY,
    nom_producte VARCHAR(100) NOT NULL,
    preu DECIMAL(5, 2) NOT NULL,
    categoria VARCHAR(50)
);

CREATE TABLE bar.Comandes (
    comanda_id SERIAL PRIMARY KEY,
    client_id INTEGER,
    data_comanda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(7, 2),
    FOREIGN KEY (client_id) REFERENCES bar.Clients(client_id)
);

CREATE TABLE bar.DetallsComanda (
    detalls_id SERIAL PRIMARY KEY,
    comanda_id INTEGER NOT NULL,
    producte_id INTEGER NOT NULL,
    quantitat INTEGER NOT NULL,
    preu DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (comanda_id) REFERENCES bar.Comandes(comanda_id),
    FOREIGN KEY (producte_id) REFERENCES bar.Productes(producte_id)
);

CREATE TABLE bar.Pagaments (
    pagament_id SERIAL PRIMARY KEY,
    comanda_id INTEGER NOT NULL,
    data_pagament TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    import DECIMAL(7, 2) NOT NULL,
    metode_pagament VARCHAR(20),
    FOREIGN KEY (comanda_id) REFERENCES bar.Comandes(comanda_id)
);

```
