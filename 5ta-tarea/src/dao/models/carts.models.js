import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: function () {
            return [];
        }
    }

})
//Parametro 1:Nombre coleccion - Parametro 2: Schema 
export const cartModel = model('carts', cartSchema)