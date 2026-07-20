import api from "./axios";


export const getRides = ()=>{

    return api.get("/rides");

};

export const createRide = (data)=>{

    return api.post("/rides", data);

};

export const getMyRides = () => {
    return api.get("/rides/my-rides");
};