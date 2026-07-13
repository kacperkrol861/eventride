const request = require("supertest");
const app = require("../app");


describe("Ride Request API", () => {

    let driverToken;
    let userToken;
    let rideId;


    beforeEach(async () => {


        await request(app)
            .post("/api/auth/register")
            .send({
                name:"Driver",
                email:"driver@test.pl",
                password:"123456"
            });


        const driverLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email:"driver@test.pl",
                password:"123456"
            });


        driverToken = driverLogin.body.token;


        const event = await request(app)
            .post("/api/events")
            .set(
                "Authorization",
                `Bearer ${driverToken}`
            )
            .send({
                title:"Test Event",
                location:"Warszawa",
                date:"2026-08-20",
                time:"15:00"
            });



        const eventId = event.body.event.id;

        const ride = await request(app)
            .post("/api/rides")
            .set(
                "Authorization",
                `Bearer ${driverToken}`
            )
            .send({
                eventId,
                from:"Warszawa",
                to:"Kraków",
                date:"2026-08-20",
                time:"15:00",
                seats:3
            });


        rideId = ride.body.ride.id;


        await request(app)
            .post("/api/auth/register")
            .send({
                name:"Passenger",
                email:"user@test.pl",
                password:"123456"
            });


        const userLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email:"user@test.pl",
                password:"123456"
            });


        userToken = userLogin.body.token;


    });



    test("user should send ride request", async()=>{


        const response = await request(app)
            .post(`/api/rides/${rideId}/request`)
            .set(
                "Authorization",
                `Bearer ${userToken}`
            );


        console.log(response.body);


        expect(response.statusCode)
            .toBe(201);


        expect(response.body)
            .toHaveProperty("request");


    });


    test("user should not send duplicate ride request", async()=>{


    await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    const response = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(400);


    expect(response.body.message)
        .toBe("Już wysłałeś prośbę");


    });

    test("driver should not request own ride", async()=>{


    const response = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${driverToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(400);


    expect(response.body.message)
        .toBe("Nie możesz dołączyć do własnego przejazdu");


    });

    test("driver should accept ride request", async()=>{


    const create = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    const requestId = create.body.request.id;

    const response = await request(app)
        .patch(`/api/requests/${requestId}/accept`)
        .set(
            "Authorization",
            `Bearer ${driverToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(200);


    expect(response.body.request.status)
        .toBe("ACCEPTED");


    });

    test("other user should not accept request", async()=>{


    const create = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    const requestId = create.body.request.id;

    const response = await request(app)
        .patch(`/api/requests/${requestId}/accept`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(403);


    expect(response.body.message)
        .toBe("Nie jesteś właścicielem przejazdu");


    });


    test("driver should reject ride request", async()=>{


    const create = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    const requestId = create.body.request.id;



    const response = await request(app)
        .patch(`/api/requests/${requestId}/reject`)
        .set(
            "Authorization",
            `Bearer ${driverToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(200);


    expect(response.body.request.status)
        .toBe("REJECTED");


    });


    test("other user should not reject ride request", async()=>{


    const create = await request(app)
        .post(`/api/rides/${rideId}/request`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    const requestId = create.body.request.id;



    const response = await request(app)
        .patch(`/api/requests/${requestId}/reject`)
        .set(
            "Authorization",
            `Bearer ${userToken}`
        );


    console.log(response.body);


    expect(response.statusCode)
        .toBe(403);


    });

});