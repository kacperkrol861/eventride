const request = require("supertest");
const app = require("../app");


describe("Event API", () => {


    it("should create event", async () => {


        const register = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Event User",
                email: "event@test.pl",
                password: "123456"
            });


        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email: "event@test.pl",
                password: "123456"
            });


        const token = login.body.token;


        const response = await request(app)
            .post("/api/events")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                title: "Koncert Testowy",
                location: "Warszawa",
                date: "2026-08-20",
                time: "15:00"
            });


        expect(response.statusCode)
            .toBe(201);


        expect(response.body)
            .toHaveProperty("event");


    });
    it("should not create event without token", async () => {


    const response = await request(app)
        .post("/api/events")
        .send({
            title: "Brak tokena",
            location: "Warszawa",
            date: "2026-08-20",
            time: "15:00"
        });


    expect(response.statusCode)
        .toBe(401);


    });

    it("should get all events", async () => {

    const response = await request(app)
        .get("/api/events");


    expect(response.statusCode)
        .toBe(200);


    expect(Array.isArray(response.body))
        .toBe(true);

    });

    it("should delete event by owner", async () => {

    
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Delete User",
            email: "delete@test.pl",
            password: "123456"
        });


    
    const login = await request(app)
        .post("/api/auth/login")
        .send({
            email: "delete@test.pl",
            password: "123456"
        });


    const token = login.body.token;


    
    const eventResponse = await request(app)
        .post("/api/events")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .send({
            title: "Event do usuniecia",
            location: "Warszawa",
            date: "2026-08-20",
            time: "15:00"
        });


    const eventId = eventResponse.body.event.id;


    
    const response = await request(app)
        .delete(`/api/events/${eventId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.statusCode)
        .toBe(200);


    expect(response.body.message)
        .toBe("Wydarzenie usunięte");

    });

    it("should not allow deleting event by another user", async () => {

    
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Owner User",
            email: "owner@test.pl",
            password: "123456"
        });


    const ownerLogin = await request(app)
        .post("/api/auth/login")
        .send({
            email: "owner@test.pl",
            password: "123456"
        });


    const ownerToken = ownerLogin.body.token;



    
    const eventResponse = await request(app)
        .post("/api/events")
        .set(
            "Authorization",
            `Bearer ${ownerToken}`
        )
        .send({
            title: "Prywatny event",
            location: "Warszawa",
            date: "2026-08-20",
            time: "15:00"
        });


    const eventId = eventResponse.body.event.id;



   
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Attacker User",
            email: "attacker@test.pl",
            password: "123456"
        });



    const attackerLogin = await request(app)
        .post("/api/auth/login")
        .send({
            email: "attacker@test.pl",
            password: "123456"
        });


    const attackerToken = attackerLogin.body.token;



    const response = await request(app)
        .delete(`/api/events/${eventId}`)
        .set(
            "Authorization",
            `Bearer ${attackerToken}`
        );


    expect(response.statusCode)
        .toBe(403);


    expect(response.body.message)
        .toBe("Nie możesz usunąć tego wydarzenia");


});



});