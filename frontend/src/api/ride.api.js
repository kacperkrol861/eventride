import api from "./axios";


export const getRides = ()=>{

    return api.get("/rides");

};