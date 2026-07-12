const prisma = require("../config/prisma");


const createRide = async (req, res) => {

    try {

        const {
            eventId,
            from,
            to,
            date,
            seats
        } = req.body;


        const event = await prisma.event.findUnique({
            where:{
                id:eventId
            }
        });


        if(!event){
            return res.status(404).json({
                message:"Nie znaleziono wydarzenia"
            });
        }


        const ride = await prisma.ride.create({

            data:{
                from,
                to,
                date:new Date(date),
                seats,
                eventId,
                driverId:req.user.id
            }

        });


        res.status(201).json({
            message:"Przejazd utworzony",
            ride
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



const getRides = async (req,res)=>{

    try{

        const rides = await prisma.ride.findMany({

            include:{
                driver:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                event:{
                    select:{
                        id:true,
                        title:true
                    }
                }
            }

        });


        res.json(rides);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



module.exports={
    createRide,
    getRides
};