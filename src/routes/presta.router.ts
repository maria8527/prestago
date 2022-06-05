import { Router } from 'express';
import express, { Request, Response } from 'express';
import { QueryResult } from 'pg';
// import { decodeToken } from '../firebase/adminTokens';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';
import validator from '../utilities/validator';
import registroSchema from '../schemas-joi/registro.schema';
import prestamoSchema from '../schemas-joi/prestamo.schema';
import pagoSchema from '../schemas-joi/pago.schema';
import { NextFunction } from 'express';
import { pool } from '../services/db';
const router = Router();

router.get('/hola', async (req: Request, res: Response) => {
    try {
      const result: QueryResult = await pool.query('SELECT * FROM hola;');
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
  

router.get('/registro', async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM registro;');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get('/registro/:id', async (req: Request, res: Response) => {
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query(
    'SELECT * FROM registro WHERE id = $1',
    [id]
  );
  return res.json(result.rows);
});

router.post(
  '/registro',
  validator.body(registroSchema),
  async (req: Request, res: Response) => {
    const {
      nombrecompleto,
      fechanacimiento,
      celular,
      tipodocumento,
      numerodoc,
      profesion,
      direccion,
      email,
      rol,
      contraseña,
    } = req.body;

    const result = await pool.query(
      'INSERT INTO registro VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      [
        nombrecompleto,
        fechanacimiento,
        celular,
        tipodocumento,
        numerodoc,
        profesion,
        direccion,
        email,
        rol,
        contraseña,
      ]
    );
    res.json({
      message: 'User register successfully',
      body: {
        user: {
          nombrecompleto,
          fechanacimiento,
          celular,
          tipodocumento,
          numerodoc,
          profesion,
          direccion,
          email,
          rol,
          contraseña,
        },
      },
    });
    return res.json(result.rows);
  }
);

router.put(
  '/registro/:id',
  validator.body(registroSchema),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {
      nombrecompleto,
      fechanacimiento,
      celular,
      tipodocumento,
      numerodoc,
      profesion,
      direccion,
      email,
      rol,
      contraseña,
    } = req.body;

    const result = await pool.query(
      'UPDATE users SET nombrecompleto = $1, fechanacimiento = $2, celular = $3, tipodocumento = $4, numerodoc = $5, profesion = $6, direccion = $7, email = $8, rol = $9, contraseña = $10 WHERE id = $11',
      [
        nombrecompleto,
        fechanacimiento,
        celular,
        tipodocumento,
        numerodoc,
        profesion,
        direccion,
        email,
        rol,
        contraseña,
        id,
      ]
    );
    res.json('User update!');
  }
);

router.delete('/registro/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM user WHERE id = ${id};`);
    res.status(200).json('Registration deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});

router.get('/prestamo', async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM prestamo');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get('/prestamo/:id', async (req: Request, res: Response) => {
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query(
    'SELECT * FROM prestamo WHERE id = $1',
    [id]
  );
  return res.json(result.rows);
});

router.post(
  '/prestamo',
  validator.body(prestamoSchema),
  async (req: Request, res: Response) => {
    const {
      nombre_completo,
      fecha_creacion,
      monto_prestar,
      plazo_en_meses,
      tasa_interes,
      estado,
    } = req.body;

    const result = await pool.query(
      'INSERT INTO prestamo VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [
        nombre_completo,
        fecha_creacion,
        monto_prestar,
        plazo_en_meses,
        tasa_interes,
        estado,
      ]
    );
    res.json({
      message: 'lend lease register successfully',
      body: {
        user: {
          nombre_completo,
          fecha_creacion,
          monto_prestar,
          plazo_en_meses,
          tasa_interes,
          estado,
        },
      },
    });
    return res.json(result.rows);
  }
);

router.put(
  '/prestamo/:id',
  validator.body(prestamoSchema),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {
      nombre_completo,
      fecha_creacion,
      monto_prestar,
      plazo_en_meses,
      tasa_interes,
      estado,
    } = req.body;

    const result = await pool.query(
      'UPDATE prestamo SET nombrecompleto = $1, fechacreacion = $2, montoprestar = $3, plazoenmese = $4, tasainteres = $5, estado = $6 WHERE id = $7',
      [
        nombre_completo,
        fecha_creacion,
        monto_prestar,
        plazo_en_meses,
        tasa_interes,
        estado,
        id,
      ]
    );
    res.json('lend lease update!');
  }
);

router.delete('/prestamo/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM prestamo  WHERE id = ${id};`);
    res.status(200).json('lend lease deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});

router.get('/pago', async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM pago');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get('/pago/:id', async (req: Request, res: Response) => {
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query(
    'SELECT * FROM pago WHERE id = $1',
    [id]
  );
  return res.json(result.rows);
});

router.post(
  '/pago',
  validator.body(pagoSchema),
  async (req: Request, res: Response) => {
    const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar } = req.body;

    const result = await pool.query('INSERT INTO pago VALUES ($1,$2,$3,$4,)', [
      fecha_pago_cuotas,
      tiempo_pagar,
      cuota_pagar,
    ]);
    res.json({
      message: 'pyment register successfully',
      body: {
        user: { fecha_pago_cuotas, tiempo_pagar, cuota_pagar },
      },
    });
    return res.json(result.rows);
  }
);

router.put(
  '/pago/:id',
  validator.body(pagoSchema),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { fecha_pago_cuotas, tiempo_pagar, cuota_pagar } = req.body;

    const result = await pool.query(
      'UPDATE pago SET fechapagocuotas = $1, tiempopagar = $2, cuotapagar = $3 WHERE id = $4',
      [fecha_pago_cuotas, tiempo_pagar, cuota_pagar, id]
    );
    res.json('payment update!');
  }
);

router.delete('/pago/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM pago  WHERE id = ${id};`);
    res.status(200).json('payment deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});

router.get('/historial', async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM historial');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get('/historial/:id', async (req: Request, res: Response) => {
  console.log('params: ');
  const id = parseInt(req.params.id);
  const result: QueryResult = await pool.query('SELECT * FROM hitorial WHERE id = $1',[id]
  );
  return res.json(result.rows);
});

router.delete('/historial/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM historial  WHERE id = ${id};`);
    res.status(200).json('historial deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});

export default router;
