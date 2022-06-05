CREATE DATABASE prestago WITH OWNER = 'prestago_silva' ENCODING = 'UTF8' TABLESPACE = table_prestago;

CREATE SCHEMA main;

CREATE SCHEMA adm;

CREATE SEQUENCE registro_seq;

CREATE TABLE registro (
  id INT4 NOT NULL DEFAULT NEXTVAL('registro_seq'),
  N_documento INTEGER NOT NULL,
  tipo_documento VARCHAR(4) NOT NULL,
  nombre_completo VARCHAR(50) NOT NULL,
  fecha_nacimiento date NOT NULL,
  numero_celular INTEGER NOT NULL,
  email VARCHAR(50) NOT NULL,
  Profesión_u_oficio VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  contraseña VARCHAR(12) NOT NULL,
  PRIMARY KEY (id)
)
INSERT INTO
  registro (
    N_documento,
    tipo_documento,
    nombre_completo,
    fecha_nacimiento,
    numero_celular,
    email,
    Profesión_u_oficio,
    direccion,
    rol,
    contraseña
  )
VALUES
  (
    514326316,
    'CC',
    'Juan',
    '2020-01-01',
    514326316,
    'hola@gmail.com',
    'Programing',
    'Calle falsa 123',
    'admin',
    '123456'
  );

CREATE SEQUENCE prestamo_seq;

CREATE TABLE prestamo (
  id INT4 NOT NULL DEFAULT NEXTVAL(' prestamo_seq '),
  monto_prestar INTEGER NOT NULL,
  plazo_en_meses INTEGER NOT NULL,
  nombre_completo VARCHAR(50) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
  tasa_interes INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_registro FOREIGN KEY (id) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)
INSERT INTO
  prestamo(
    monto_prestar,
    plazo_en_meses,
    nombre_completo,
    fecha_creacion,
    tasa_interes,
    estado
  )
VALUES
  (
    100000,
    12,
    'Juan Perez',
    '2020-01-01 00:00:00',
    0.05,
    'Pendiente'
  );

CREATE SEQUENCE pago_seq;

CREATE TABLE pago (
  id INT4 NOT NULL DEFAULT NEXTVAL(' pago_seq '),
  fecha_pago_cuotas date NOT NULL,
  tiempo_pagar INTEGER NOT NULL,
  cuota_pagar INTEGER NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo FOREIGN KEY (id) REFERENCES prestamo (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_registro FOREIGN KEY (id) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)
INSERT INTO
  pago(fecha_pago_cuotas, tiempo_pagar, cuota_pagar)
VALUES
  ('2020-01-01', 1, 100);

CREATE SEQUENCE historial_seq;

CREATE TABLE historial (
  id INT4 NOT NULL DEFAULT NEXTVAL(' historial_seq '),
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo FOREIGN KEY (id) REFERENCES prestamo (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_registro FOREIGN KEY (id) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
)