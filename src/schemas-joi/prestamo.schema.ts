import Joi from 'joi';

const prestamoSchema = Joi.object({
    id: Joi.string(),
    full_name: Joi.string().required(),
    monto_prestar: Joi.number().required(),
    plazo_meses: Joi.number().required(),
    fecha_creacion: Joi.date().required(),
    tasa_interes: Joi.number().required(),
    estado: Joi.string().required()
});

export default prestamoSchema;