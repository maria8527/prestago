"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const prestamoSchema = joi_1.default.object({
    id: joi_1.default.string(),
    full_name: joi_1.default.string().required(),
    monto_prestar: joi_1.default.number().required(),
    plazo_meses: joi_1.default.number().required(),
    fecha_creacion: joi_1.default.date().required(),
    tasa_interes: joi_1.default.number().required(),
    estado: joi_1.default.string().required()
});
exports.default = prestamoSchema;
//# sourceMappingURL=prestamo.schema.js.map