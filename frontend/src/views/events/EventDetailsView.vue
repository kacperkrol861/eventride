<template>

<div class="event-detail">



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
Request already sent or no seats available.
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









<section class="hero">


<h1>
{{ event?.title }}
</h1>


<p>
{{ event?.description }}
</p>



<div class="info">


<span>
📍 {{ event?.location }}
</span>


<span>
📅 {{ formatDate(event?.date) }}
</span>


</div>


</section>









<section class="rides">


<h2>
Available rides
</h2>







<div class="rides-grid">


<RideCard

v-for="ride in eventRides"

:key="ride.id"

:ride="ride"

@request="sendRequest"

/>


</div>









<div

v-if="!eventRides.length"

class="empty"

>


No rides available yet


</div>





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

useRoute

} from "vue-router";



import {

Icon

} from "@iconify/vue";



import {

getEvents

} from "@/api/event.api";


import {

getRides

} from "@/api/ride.api";


import {

createRequest

} from "@/api/request.api";



import RideCard from "@/components/rides/RideCard.vue";








const route = useRoute();




const event = ref(null);


const rides = ref([]);




const requestStatus = ref(null);









const loadData = async()=>{


try{


const eventsResponse =
await getEvents();



const ridesResponse =
await getRides();





event.value =

eventsResponse.data.find(

e=>e.id == route.params.id

);





rides.value =

Array.isArray(ridesResponse.data)

?

ridesResponse.data

:

[];





}

catch(error){

console.log(error);

}


};









const eventRides = computed(()=>{


if(!event.value)

return [];




return rides.value.filter(

ride=>

ride.eventId === event.value.id

);


});









const sendRequest = async(ride)=>{


try{



requestStatus.value="loading";




await createRequest(

ride.id

);





setTimeout(()=>{


requestStatus.value="success";


},700);





setTimeout(()=>{


requestStatus.value=null;


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







onMounted(loadData);



</script>









<style scoped>


.event-detail{


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








.warning-box{


background:#f59e0b;

color:white;


padding:50px;


border-radius:25px;


box-shadow:

0 20px 50px rgba(0,0,0,.2);


}








.danger-box{


background:#dc2626;

color:white;


padding:50px;


border-radius:25px;


box-shadow:

0 20px 50px rgba(0,0,0,.2);


}








.check,
.warning-icon,
.danger-icon{


width:80px;


height:80px;


border-radius:50%;


background:white;


display:flex;


align-items:center;


justify-content:center;


margin:auto;


font-size:45px;


}







.check{

color:#16a34a;

}




.warning-icon{

color:#f59e0b;

}




.danger-icon{

color:#dc2626;

}









.success-box h2,
.warning-box h2,
.danger-box h2{


margin-top:20px;

font-size:30px;


}









.hero{


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


margin:0;


font-weight:800;


}








.hero p{


margin-top:15px;


opacity:.9;


}








.info{


display:flex;


gap:25px;


margin-top:25px;


}








.rides{


margin-top:40px;


}








.rides-grid{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(280px,1fr)

);


gap:20px;


margin-top:20px;


}








.empty{


text-align:center;


margin-top:30px;


color:var(--va-text-secondary);


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