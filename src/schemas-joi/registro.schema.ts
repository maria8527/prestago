import Joi, { number, string, date } from 'joi';

const registroSchema = Joi.object({
    id: Joi.number(),
    nombre_completo: Joi.string().required(),
    fecha_nacimiento: Joi.date().required(),
    numero_celular: Joi.number().required(),
    tipo_documento: Joi.string().required(),
    N_documento: Joi.number().required(),
    profesion_u_oficio: Joi.string().required(),
    direccion: Joi.string().required(),
    email: Joi.string().required(),
    rol: Joi.string().required(),
    contraseña: Joi.string().required()
});

export default registroSchema;