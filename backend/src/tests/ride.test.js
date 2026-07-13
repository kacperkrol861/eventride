const request = require("supertest");
const app = require("../app");


describe("Ride API", () => {

    let token;
    let eventId;


    beforeEach(async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Driver Test",
                email: "driver@test.pl",
                password: "123456"
            });


        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email: "driver@test.pl",
                password: "123456"
            });


        token = login.body.token;


        const event = await request(app)
            .post("/api/events")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                title: "Ride Test Event",
                location: "Warszawa",
                date: "2026-08-20",
                time: "15:00"
            });


        console.log("EVENT RESPONSE:", event.body);


        eventId = event.body.event.id;

    });



    test("should create a ride", async () => {


        const response = await request(app)
            .post("/api/rides")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({

                eventId: eventId,

                from: "Warszawa",

                to: "Kraków",

                date: "2026-08-20",

                time: "15:00",

                seats: 3

            });


        console.log(response.body);


        expect(response.statusCode)
            .toBe(201);


        expect(response.body)
            .toHaveProperty("ride");


    });


});