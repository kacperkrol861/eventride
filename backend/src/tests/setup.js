require("dotenv").config({
    path: ".env.test"
});

const prisma = require("../config/prisma");


beforeEach(async () => {

    await prisma.rideRequest.deleteMany();
    await prisma.ride.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

});


afterAll(async () => {

    await prisma.$disconnect();

});