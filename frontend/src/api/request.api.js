import api from "./axios";



export const createRequest = (rideId)=>{

    return api.post(
        `/rides/${rideId}/request`
    );

};





export const getRequests = (rideId)=>{

    return api.get(
        `/rides/${rideId}/requests`
    );

};





export const acceptRequest = (requestId)=>{

    return api.patch(
        `/requests/${requestId}/accept`
    );

};





export const rejectRequest = (requestId)=>{

    return api.patch(
        `/requests/${requestId}/reject`
    );

};