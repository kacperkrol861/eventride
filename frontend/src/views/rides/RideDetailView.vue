<template>

<div class="ride-detail">



<VaButton

flat

color="secondary"

class="back-button"

@click="goBack"

>

<Icon
icon="mdi:arrow-left"
/>


Back to rides


</VaButton>






<section class="hero">

<div>


<h1>

{{ ride?.from }}

<Icon icon="mdi:arrow-right"/>

{{ ride?.to }}

</h1>



<p v-if="ride?.event">

{{ ride.event.title }}

</p>



<p v-else>

Ride details

</p>



</div>




<VaChip
:color="availability.color"
>

{{ availability.text }}

</VaChip>



</section>









<section
v-if="mapPoints"
class="map-section"
>


<VaCard>


<VaCardContent>


<h2>

Route

</h2>



<RideMap

:from="mapPoints.from"

:to="mapPoints.to"

/>



</VaCardContent>


</VaCard>



</section>










<section class="content">





<VaCard>

<VaCardContent>


<h2>

Ride information

</h2>





<div class="info">



<div>

<Icon icon="mdi:calendar-outline"/>

{{ formatDate(ride?.date) }}

</div>







<div>

<Icon icon="mdi:seat-passenger"/>

{{ ride?.seats }} seats available

</div>







<div>

<Icon icon="mdi:account-circle-outline"/>

{{ ride?.driver?.name || "Unknown driver" }}

</div>







<div>

<Icon icon="mdi:map-marker-outline"/>

{{ ride?.from }}

</div>







<div>

<Icon icon="mdi:map-marker"/>

{{ ride?.to }}

</div>





</div>



</VaCardContent>


</VaCard>









<VaButton

color="primary"

size="large"

:disabled="ride?.seats===0"

@click="requestRide"

>



<Icon icon="mdi:car-arrow-right"/>


Join ride



</VaButton>





</section>





</div>


</template>









<script setup>


import {

ref,

computed,

onMounted

} from "vue";



import {

useRoute,

useRouter

} from "vue-router";



import {

Icon

} from "@iconify/vue";



import {

getRides

} from "@/api/ride.api";



import {

getCoordinates

} from "@/api/geocode.api";



import RideMap from "@/components/rides/RideMap.vue";







const route = useRoute();


const router = useRouter();




const ride = ref(null);



const mapPoints = ref(null);









const loadRide = async()=>{


try{


const response = await getRides();




const rides =

Array.isArray(response.data)

?

response.data

:

[];






ride.value =

rides.find(

r=>r.id == route.params.id

);







if(ride.value){


await loadMap();


}



}

catch(error){


console.log(error);


}


};









const loadMap = async()=>{


try{


const from =

await getCoordinates(

ride.value.from

);





const to =

await getCoordinates(

ride.value.to

);







if(!from || !to){

return;

}





mapPoints.value={


from,

to


};




}

catch(error){


console.log(

"Map error",

error

);


}



};









const availability = computed(()=>{


if(!ride.value)

return {};





if(ride.value.seats === 0){


return {


text:"Full",

color:"danger"


};


}







if(ride.value.seats <= 3){


return {


text:`Only ${ride.value.seats} seats left`,

color:"warning"


};


}







return {


text:"Available",

color:"success"


};



});









const formatDate=(date)=>{


if(!date)

return "";




return new Date(date)

.toLocaleString(

"en-US",

{


day:"numeric",

month:"short",

year:"numeric",

hour:"2-digit",

minute:"2-digit"


}

);



};








const goBack = ()=>{


router.push("/rides");


};









const requestRide=()=>{


console.log(

"Request ride:",

ride.value.id

);



};









onMounted(loadRide);



</script>









<style scoped>


.ride-detail{


animation:fade .3s ease;


}






.back-button{


margin-bottom:20px;

display:flex;

align-items:center;

gap:8px;


}







.hero{


display:flex;

justify-content:space-between;

align-items:center;

padding:35px;

border-radius:20px;

background:

linear-gradient(

135deg,

var(--va-primary),

#6c8cff

);

color:white;


}








.hero h1{


font-size:34px;

display:flex;

gap:12px;

align-items:center;


}







.hero p{


margin-top:10px;

font-size:18px;

opacity:.9;


}








.map-section{


margin-top:30px;


}








.content{


margin-top:30px;

display:flex;

flex-direction:column;

gap:20px;


}








.info{


display:flex;

flex-direction:column;

gap:15px;


}








.info div{


display:flex;

align-items:center;

gap:10px;


}








.info svg{


color:var(--va-primary);


}









@keyframes fade{


from{


opacity:0;

transform:translateY(10px);


}



to{


opacity:1;


}



}



</style>