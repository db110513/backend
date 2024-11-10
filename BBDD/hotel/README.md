CREATE SCHEMA hotel;

CREATE TABLE hotel.Clients (
    client_id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    cognoms VARCHAR(50) NOT NULL,
    telefon VARCHAR(15),
    email VARCHAR(100),
    data_registre DATE DEFAULT CURRENT_DATE
);

CREATE TABLE hotel.Habitacions (
    habitacio_id SERIAL PRIMARY KEY,
    numero_habitacio INTEGER NOT NULL UNIQUE,
    tipus VARCHAR(50) NOT NULL,
    preu_per_nit DECIMAL(7, 2) NOT NULL,
    estat VARCHAR(20) DEFAULT 'disponible'
);

CREATE TABLE hotel.Reserves (
    reserva_id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    habitacio_id INTEGER NOT NULL,
    data_inici DATE NOT NULL,
    data_fi DATE NOT NULL,
    total DECIMAL(10, 2),
    FOREIGN KEY (client_id) REFERENCES hotel.Clients(client_id),
    FOREIGN KEY (habitacio_id) REFERENCES hotel.Habitacions(habitacio_id)
);

CREATE TABLE hotel.Factures (
    factura_id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL,
    data_factura DATE DEFAULT CURRENT_DATE,
    import DECIMAL(10, 2) NOT NULL,
    pagat BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (reserva_id) REFERENCES hotel.Reserves(reserva_id)
);

CREATE TABLE hotel.ServeisExtra (
    servei_id SERIAL PRIMARY KEY,
    nom_servei VARCHAR(50) NOT NULL,
    descripcio TEXT,
    preu DECIMAL(7, 2) NOT NULL
);

CREATE TABLE hotel.ServeisReserva (
    servei_reserva_id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL,
    servei_id INTEGER NOT NULL,
    quantitat INTEGER NOT NULL DEFAULT 1,
    preu_total DECIMAL(10, 2),
    FOREIGN KEY (reserva_id) REFERENCES hotel.Reserves(reserva_id),
    FOREIGN KEY (servei_id) REFERENCES hotel.ServeisExtra(servei_id)
);
