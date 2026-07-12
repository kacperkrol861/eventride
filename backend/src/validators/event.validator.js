const { z } = require("zod");


const createEventSchema = z.object({

    title: z
        .string()
        .min(3, "Tytuł minimum 3 znaki"),

    description: z
        .string()
        .max(500, "Opis za długi")
        .optional(),

    location: z
        .string()
        .min(3, "Lokalizacja minimum 3 znaki"),

    date: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Data musi być w formacie YYYY-MM-DD"
        ),

    time: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Godzina musi być w formacie HH:mm"
        )

});


module.exports = {
    createEventSchema
};