CREATE SCHEMA banc;

CREATE TABLE banc.Clients (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    cognoms VARCHAR(50) NOT NULL,
    telefon VARCHAR(15),
    email VARCHAR(100),
    data_registre DATE DEFAULT CURRENT_DATE
);

CREATE TABLE banc.Comptes (
    compte_id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    numero_compte VARCHAR(20) UNIQUE NOT NULL,
    saldo DECIMAL(15, 2) DEFAULT 0.00,
    tipus VARCHAR(20) NOT NULL,
    data_obertura DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (client_id) REFERENCES banc.Clients(client_id)
);

CREATE TABLE banc.Transaccions (
    transaccio_id SERIAL PRIMARY KEY,
    compte_id INTEGER NOT NULL,
    data_transaccio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipus VARCHAR(20) CHECK (tipus IN ('dipòsit', 'retirada', 'transferència')),
    import DECIMAL(10, 2) NOT NULL,
    descripcio TEXT,
    FOREIGN KEY (compte_id) REFERENCES banc.Comptes(compte_id)
);

CREATE TABLE banc.Targetes (
    targeta_id SERIAL PRIMARY KEY,
    compte_id INTEGER NOT NULL,
    numero_targeta VARCHAR(16) UNIQUE NOT NULL,
    tipus VARCHAR(20) CHECK (tipus IN ('crèdit', 'dèbit')),
    data_expiracio DATE NOT NULL,
    estat VARCHAR(20) DEFAULT 'activa',
    FOREIGN KEY (compte_id) REFERENCES banc.Comptes(compte_id)
);

CREATE TABLE banc.Pagaments (
    pagament_id SERIAL PRIMARY KEY,
    targeta_id INTEGER NOT NULL,
    data_pagament TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    import DECIMAL(10, 2) NOT NULL,
    establiment VARCHAR(100),
    FOREIGN KEY (targeta_id) REFERENCES banc.Targetes(targeta_id)
);
