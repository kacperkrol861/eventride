const { z } = require("zod");


const registerSchema = z.object({

    name: z
        .string()
        .min(3, "Nazwa musi mieć minimum 3 znaki"),


    email: z
        .string()
        .email("Niepoprawny email"),


    password: z
        .string()
        .min(6, "Hasło minimum 6 znaków")

});


module.exports = {
    registerSchema
};