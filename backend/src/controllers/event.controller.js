const prisma = require("../config/prisma");


const createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            location,
            date,
            time
        } = req.body;

        const eventDate = new Date(`${date}T${time}:00`);

        const event = await prisma.event.create({

            data:{
                title,
                description,
                location,
                date:eventDate,
                creatorId: req.user.id
            }

        });


        res.status(201).json({
            message: "Wydarzenie utworzone",
            event
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



const getEvents = async (req,res)=>{

    try{

        const events = await prisma.event.findMany({

            include:{
                creator:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }

        });


        res.json(events);


    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};



module.exports = {
    createEvent,
    getEvents
};