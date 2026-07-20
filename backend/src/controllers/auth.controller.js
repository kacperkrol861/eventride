const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");


const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if(existingUser){
            return res.status(400).json({
                message: "Email już istnieje"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        });


        res.status(201).json({
            message:"Użytkownik utworzony",
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

const jwt = require("jsonwebtoken");
const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if(!user){
            return res.status(401).json({
                message: "Nieprawidłowy email lub hasło"
            });
        }


        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if(!passwordMatch){
            return res.status(401).json({
                message: "Nieprawidłowy email lub hasło"
            });
        }


        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            message: "Zalogowano",
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};
const getAccountStatistics = async (req, res) => {

    try {

        const userId = req.user.id;

        const [
            createdRides,
            eventsCreated,
            joinedRides,
            pendingRequests,
            acceptedRequests,
            rejectedRequests
        ] = await Promise.all([

            prisma.ride.count({
                where: {
                    driverId: userId
                }
            }),

            prisma.event.count({
                where: {
                    creatorId: userId
                }
            }),

            prisma.rideRequest.count({
                where: {
                    userId,
                    status: "ACCEPTED"
                }
            }),

            prisma.rideRequest.count({
                where: {
                    userId,
                    status: "PENDING"
                }
            }),

            prisma.rideRequest.count({
                where: {
                    userId,
                    status: "ACCEPTED"
                }
            }),

            prisma.rideRequest.count({
                where: {
                    userId,
                    status: "REJECTED"
                }
            })

        ]);

        res.json({

            createdRides,
            eventsCreated,
            joinedRides,
            pendingRequests,
            acceptedRequests,
            rejectedRequests

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    register,
    login,
    getAccountStatistics
};