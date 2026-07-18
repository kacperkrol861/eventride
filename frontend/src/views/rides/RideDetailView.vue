<template>

<div class="ride-detail">



<div
v-if="requestStatus"
class="request-overlay"
>




<div
v-if="requestStatus==='loading'"
class="loader-box"
>


<div class="spinner"></div>


<h2>
Sending request...
</h2>


</div>








<div
v-if="requestStatus==='success'"
class="success-box"
>


<div class="check">

<Icon icon="mdi:check"/>

</div>


<h2>
Request sent!
</h2>


<p>
The driver will review your request.
</p>


</div>









<div
v-if="requestStatus==='warning'"
class="warning-box"
>


<div class="warning-icon">

<Icon icon="mdi:clock-alert-outline"/>

</div>


<h2>
Request unavailable
</h2>


<p>
You already requested this ride or there are no seats available.
</p>


</div>








<div
v-if="requestStatus==='danger'"
class="danger-box"
>


<div class="danger-icon">

<Icon icon="mdi:account-cancel-outline"/>

</div>


<h2>
Your ride
</h2>


<p>
You cannot request your own ride.
</p>


</div>





</div>









<VaButton

flat

color="secondary"

class="back-button"

@click="goBack"

>


<Icon icon="mdi:arrow-left"/>


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

:disabled="

ride?.seats===0 ||

requestStatus

"

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



import {

createRequest

} from "@/api/request.api";



import RideMap from "@/components/rides/RideMap.vue";







const route = useRoute();

const router = useRouter();





const ride = ref(null);


const mapPoints = ref(null);



const requestStatus = ref(null);









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









const requestRide = async()=>{


try{


requestStatus.value="loading";





await createRequest(

ride.value.id

);






setTimeout(()=>{


requestStatus.value="success";


},700);






setTimeout(()=>{


router.push("/rides");


},2500);



}
catch(error){


console.log(error);




const message =

error.response?.data?.message;







if(

message === "Już wysłałeś prośbę"

||

message === "Brak wolnych miejsc"

){


requestStatus.value="warning";



setTimeout(()=>{


requestStatus.value=null;


},3000);



return;


}








if(

message === "Nie możesz dołączyć do własnego przejazdu"

){


requestStatus.value="danger";



setTimeout(()=>{


requestStatus.value=null;


},3000);



return;


}






requestStatus.value=null;


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









onMounted(loadRide);



</script>









<style scoped>


.ride-detail{


animation:fade .3s ease;


}






.request-overlay{


position:fixed;

inset:0;


background:rgba(255,255,255,.96);


display:flex;

justify-content:center;


align-items:center;


z-index:9999;


}







.loader-box,
.success-box,
.warning-box,
.danger-box{


text-align:center;


animation:fade .3s ease;


}







.spinner{


width:70px;

height:70px;


border-radius:50%;


border:6px solid #ddd;


border-top-color:var(--va-primary);


animation:spin 1s linear infinite;


margin:auto;


}







.success-box{


background:#16a34a;


color:white;


padding:50px;


border-radius:25px;


box-shadow:

0 20px 50px rgba(0,0,0,.2);


}







.check{


width:80px;


height:80px;


border-radius:50%;


background:white;


color:#16a34a;


display:flex;


justify-content:center;


align-items:center;


margin:auto;


font-size:50px;


}







.warning-box{


background:#f59e0b;


color:white;


padding:50px;


border-radius:25px;


box-shadow:

0 20px 50px rgba(0,0,0,.2);


}







.warning-icon{


width:80px;


height:80px;


border-radius:50%;


background:white;


color:#f59e0b;


display:flex;


justify-content:center;


align-items:center;


margin:auto;


font-size:45px;


}







.danger-box{


background:#dc2626;


color:white;


padding:50px;


border-radius:25px;


box-shadow:

0 20px 50px rgba(0,0,0,.2);


}







.danger-icon{


width:80px;


height:80px;


border-radius:50%;


background:white;


color:#dc2626;


display:flex;


justify-content:center;


align-items:center;


margin:auto;


font-size:45px;


}







.success-box h2,
.warning-box h2,
.danger-box h2{


margin-top:20px;


font-size:32px;


}







.success-box p,
.warning-box p,
.danger-box p{


font-size:17px;


opacity:.95;


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








@keyframes spin{


to{


transform:rotate(360deg);


}


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