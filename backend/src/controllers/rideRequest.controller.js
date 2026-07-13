const prisma = require("../config/prisma");


const createRequest = async (req, res) => {

    try {

        const rideId = Number(req.params.id);


        const ride = await prisma.ride.findUnique({
            where:{
                id: rideId
            }
        });


        if(!ride){
            return res.status(404).json({
                message:"Nie znaleziono przejazdu"
            });
        }


        if(ride.driverId === req.user.id){
            return res.status(400).json({
                message:"Nie możesz dołączyć do własnego przejazdu"
            });
        }


        const existingRequest = await prisma.rideRequest.findFirst({
            where:{
                rideId,
                userId:req.user.id
            }
        });


        if(existingRequest){
            return res.status(400).json({
                message:"Już wysłałeś prośbę"
            });
        }


        const request = await prisma.rideRequest.create({

            data:{
                rideId,
                userId:req.user.id
            }

        });


        res.status(201).json({
            message:"Prośba wysłana",
            request
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

const getRequests = async (req,res)=>{

    try{

        const rideId = Number(req.params.id);


        const ride = await prisma.ride.findUnique({
            where:{
                id:rideId
            }
        });


        if(!ride){
            return res.status(404).json({
                message:"Nie znaleziono przejazdu"
            });
        }


        if(ride.driverId !== req.user.id){
            return res.status(403).json({
                message:"Nie jesteś właścicielem tego przejazdu"
            });
        }


        const requests = await prisma.rideRequest.findMany({

            where:{
                rideId
            },

            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }

        });


        res.json(requests);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

const acceptRequest = async (req,res)=>{

    try{

        const requestId = Number(req.params.id);


        const request = await prisma.rideRequest.findUnique({
            where:{
                id:requestId
            },
            include:{
                ride:true
            }
        });


        if(!request){
            return res.status(404).json({
                message:"Nie znaleziono prośby"
            });
        }


        if(request.ride.driverId !== req.user.id){
            return res.status(403).json({
                message:"Nie jesteś właścicielem przejazdu"
            });
        }


        const updated = await prisma.rideRequest.update({

            where:{
                id:requestId
            },

            data:{
                status:"ACCEPTED"
            }

        });


        res.json({
            message:"Zaakceptowano użytkownika",
            request:updated
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

const rejectRequest = async (req,res)=>{

    try{

        const requestId = Number(req.params.id);


        const request = await prisma.rideRequest.findUnique({
            where:{
                id:requestId
            },
            include:{
                ride:true
            }
        });


        if(!request){
            return res.status(404).json({
                message:"Nie znaleziono prośby"
            });
        }


        if(request.ride.driverId !== req.user.id){
            return res.status(403).json({
                message:"Nie jesteś właścicielem przejazdu"
            });
        }


        const updated = await prisma.rideRequest.update({

            where:{
                id:requestId
            },

            data:{
                status:"REJECTED"
            }

        });


        res.json({
            message:"Odrzucono prośbę",
            request:updated
        });


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

module.exports = {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest
};