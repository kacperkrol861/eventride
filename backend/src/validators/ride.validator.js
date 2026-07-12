const { z } = require("zod");


const createRideSchema = z.object({

    eventId: z
        .number({
            message: "Event ID musi być liczbą"
        })
        .int()
        .positive(),


    from: z
        .string()
        .min(3, "Miejsce startu minimum 3 znaki"),


    to: z
        .string()
        .min(3, "Miejsce docelowe minimum 3 znaki"),


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
        ),


    seats: z
        .number({
            message:"Liczba miejsc musi być liczbą"
        })
        .int()
        .min(1, "Minimum 1 miejsce")
        .max(8, "Maksymalnie 8 miejsc")

});


module.exports = {
    createRideSchema
};