import axios from "axios";

const geocodeCache = {};

export const getCoordinates = async(location)=>{

  if(geocodeCache[location]){
    return geocodeCache[location];
  }

  try{

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params:{
          q:location,
          format:"json",
          limit:1
        },
        headers:{
          "Accept-Language":"pl"
        }
      }
    );


    if(!response.data.length){
      return null;
    }


    const result = {

      lat:Number(response.data[0].lat),

      lng:Number(response.data[0].lon)

    };


    geocodeCache[location]=result;


    return result;


  }catch(error){

    console.log(
      "Geocode error:",
      error
    );

    return null;

  }

};