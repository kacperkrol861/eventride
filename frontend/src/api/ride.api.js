import api from "./axios";


export const getRides = ()=>{

    return api.get("/rides");

};

export const createRide = (data)=>{

    return api.post("/rides", data);

};