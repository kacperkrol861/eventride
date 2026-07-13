const request = require("supertest");
const app = require("../app");


describe("Auth API", () => {

    it("should register a new user", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@test.pl",
                password: "123456"
            });


        expect(response.statusCode).toBe(201);

        expect(response.body)
            .toHaveProperty("user");

        expect(response.body.user.email)
            .toBe("test@test.pl");

    });

    it("should not register user with existing email", async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Test User",
            email: "duplicate@test.pl",
            password: "123456"
        });


    const response = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Another User",
            email: "duplicate@test.pl",
            password: "123456"
        });


    expect(response.statusCode).toBe(400);

    expect(response.body.message)
        .toBe("Email już istnieje");

});

    it("should login user and return token", async () => {


    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Login User",
            email: "login@test.pl",
            password: "123456"
        });


    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "login@test.pl",
            password: "123456"
        });


    expect(response.statusCode).toBe(200);


    expect(response.body)
        .toHaveProperty("token");


});

    it("should not login with wrong password", async () => {


    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Wrong Password User",
            email: "wrongpass@test.pl",
            password: "123456"
        });


    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "wrongpass@test.pl",
            password: "wrongpassword"
        });

    expect(response.statusCode).toBe(401);


    expect(response.body)
        .toHaveProperty("message");


});

});