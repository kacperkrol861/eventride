<template>

<div class="rides-page">



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









<section class="header">


<div>


<h1>
Available rides
</h1>


<p>
Find a ride and travel together.
</p>


</div>





<VaButton

color="primary"

@click="router.push('/rides/create')"

>


<Icon icon="mdi:plus"/>


Create ride


</VaButton>



</section>









<section class="filters">



<div class="field">


<div class="field-label">


<Icon icon="mdi:map-marker-path"/>


<span>
Search route
</span>


</div>




<VaInput

v-model="search"

placeholder="Warsaw, Kraków..."

/>



</div>









<div class="field">


<div class="field-label">


<Icon icon="mdi:seat-passenger"/>


<span>
Available seats
</span>


</div>




<VaSelect

v-model="seatFilter"

:options="seatOptions"

placeholder="Choose seats..."

/>



</div>



</section>









<section class="rides-grid">



<RideCard

v-for="ride in filteredRides"

:key="ride.id"

:ride="ride"

@request="sendRequest"

/>



</section>









<div

v-if="!filteredRides.length"

class="empty"

>


No rides found


</div>





</div>

</template>









<script setup>


import {

ref,

computed,

onMounted

} from "vue";



import {

useRouter

} from "vue-router";



import {

Icon

} from "@iconify/vue";



import RideCard from "@/components/rides/RideCard.vue";



import {

getRides

} from "@/api/ride.api";



import {

createRequest

} from "@/api/request.api";








const router = useRouter();




const rides = ref([]);


const search = ref("");


const seatFilter = ref("");



const requestStatus = ref(null);







const seatOptions = [

"Any",

"1+ seats",

"3+ seats",

"5+ seats"

];









const loadRides = async()=>{


try{


const response = await getRides();



rides.value =

Array.isArray(response.data)

?

response.data

:

[];




}
catch(error){

console.log(error);

}


};









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









const filteredRides = computed(()=>{


return rides.value.filter(ride=>{


const text =

search.value.toLowerCase();





const routeMatch =


ride.from

.toLowerCase()

.includes(text)



||



ride.to

.toLowerCase()

.includes(text);






let seatsMatch=true;






if(seatFilter.value==="1+ seats"){


seatsMatch =
ride.seats >= 1;


}






if(seatFilter.value==="3+ seats"){


seatsMatch =
ride.seats >= 3;


}






if(seatFilter.value==="5+ seats"){


seatsMatch =
ride.seats >= 5;


}





return routeMatch && seatsMatch;



});

});









onMounted(loadRides);



</script>









<style scoped>


.rides-page{

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

align-items:center;


justify-content:center;


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


font-size:30px;


}







.success-box p,
.warning-box p,
.danger-box p{


font-size:17px;


opacity:.95;


}







.header{


display:flex;

justify-content:space-between;

align-items:center;

gap:20px;

margin-bottom:30px;


}







.header h1{


font-size:32px;

font-weight:800;

margin:0;


}







.header p{


margin-top:8px;

color:var(--va-text-secondary);


}







.header button{


display:flex;

align-items:center;

gap:8px;


}







.filters{


display:flex;

gap:20px;

margin-bottom:30px;


}







.field{


flex:1;


}







.field-label{


display:flex;

align-items:center;

gap:8px;


margin-bottom:8px;


font-weight:600;


color:var(--va-text-secondary);


}







.field-label svg{


color:var(--va-primary);

font-size:20px;


}







.rides-grid{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(300px,1fr)

);


gap:20px;


}







.empty{


text-align:center;

margin-top:40px;


color:var(--va-text-secondary);


}







:deep(.material-icons),
:deep(.material-symbols-outlined),
:deep(.va-icon){

display:none !important;


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







@media(max-width:700px){


.header{

flex-direction:column;

align-items:flex-start;


}



.filters{

flex-direction:column;


}



.header h1{

font-size:26px;


}



}



</style>