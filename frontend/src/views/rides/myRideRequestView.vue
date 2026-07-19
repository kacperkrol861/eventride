<template>

<div class="page">



<div
v-if="actionStatus"
class="overlay"
>


<div
v-if="actionStatus==='accepted'"
class="result success"
>

<div class="icon-circle">

<Icon icon="mdi:check"/>

</div>


<h2>
Request accepted
</h2>


<p>
User has been added to your ride.
</p>


</div>






<div
v-if="actionStatus==='rejected'"
class="result danger"
>

<div class="icon-circle">

<Icon icon="mdi:close"/>

</div>


<h2>
Request rejected
</h2>


<p>
The request has been removed.
</p>


</div>


</div>









<section class="header">


<div>

<h1>
Ride requests
</h1>


<p>
Manage people who want to join your rides.
</p>


</div>




<VaButton

color="secondary"

@click="router.push('/dashboard')"

>


<Icon icon="mdi:arrow-left"/>

Back to dashboard


</VaButton>



</section>









<div
v-if="loading"
class="loading"
>

<div class="spinner"></div>

Loading requests...

</div>









<div
v-else-if="!requests.length"
class="empty"
>


<Icon icon="mdi:car-off"/>


<h3>
No ride requests
</h3>


<p>
You don't have any pending requests.
</p>


</div>









<section
v-else
class="requests"
>



<VaCard

v-for="request in requests"

:key="request.id"

class="request-card"

>



<VaCardContent>




<div class="top">



<div class="user">


<VaAvatar
color="primary"
size="42px"
>

{{ request.user?.name?.charAt(0) }}

</VaAvatar>




<div>

<h3>
{{ request.user?.name }}
</h3>


<span>
{{ request.user?.email }}
</span>


</div>


</div>





<VaChip color="warning">

{{ request.status }}

</VaChip>



</div>









<div class="route">


<Icon icon="mdi:map-marker-path"/>


<strong>

{{ request.ride?.from }}

→

{{ request.ride?.to }}

</strong>


</div>








<div class="date">


<Icon icon="mdi:calendar"/>


{{ formatDate(request.createdAt) }}


</div>









<div class="actions">



<VaButton

color="success"

:disabled="processing"

@click="accept(request.id)"

>


<Icon icon="mdi:check"/>

Accept


</VaButton>







<VaButton

color="danger"

:disabled="processing"

@click="reject(request.id)"

>


<Icon icon="mdi:close"/>

Reject


</VaButton>



</div>






</VaCardContent>


</VaCard>



</section>






</div>

</template>










<script setup>


import {

ref,

onMounted

} from "vue";


import {

useRouter

} from "vue-router";


import {

Icon

} from "@iconify/vue";


import {

getMyRideRequests,

acceptRequest,

rejectRequest

} from "@/api/request.api";




const router = useRouter();



const requests = ref([]);


const loading = ref(true);


const processing = ref(false);


const actionStatus = ref(null);








const loadRequests = async()=>{


try{


loading.value=true;


const response =
await getMyRideRequests();



requests.value =
Array.isArray(response.data)

?

response.data

:

[];



}
catch(error){

console.log(error);

}
finally{

loading.value=false;

}


};








const accept = async(id)=>{


try{


processing.value=true;


await acceptRequest(id);



actionStatus.value="accepted";



setTimeout(async()=>{


actionStatus.value=null;


await loadRequests();


processing.value=false;


},1800);



}
catch(error){

console.log(error);

processing.value=false;

}


};








const reject = async(id)=>{


try{


processing.value=true;


await rejectRequest(id);



actionStatus.value="rejected";



setTimeout(async()=>{


actionStatus.value=null;


await loadRequests();


processing.value=false;


},1800);



}
catch(error){

console.log(error);

processing.value=false;

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







onMounted(loadRequests);



</script>









<style scoped>


.page{

animation:fade .3s ease;

}







.overlay{


position:fixed;

inset:0;

background:rgba(255,255,255,.96);

display:flex;

justify-content:center;

align-items:center;

z-index:9999;

}





.result{


padding:50px;

border-radius:25px;

color:white;

text-align:center;

animation:pop .35s ease;

box-shadow:0 20px 50px rgba(0,0,0,.25);

}



.success{

background:#16a34a;

}



.danger{

background:#dc2626;

}



.icon-circle{


width:90px;

height:90px;

border-radius:50%;

background:white;

display:flex;

justify-content:center;

align-items:center;

font-size:55px;

margin:auto;

}



.success .icon-circle{

color:#16a34a;

}


.danger .icon-circle{

color:#dc2626;

}





.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:30px;

}



.header h1{

font-size:32px;

font-weight:800;

margin:0;

}



.header p{

color:#64748b;

margin-top:8px;

}





.requests{

display:grid;

grid-template-columns:

repeat(auto-fit,minmax(320px,1fr));

gap:20px;

}



.request-card{

border-radius:20px;

}





.top{

display:flex;

justify-content:space-between;

align-items:center;

}



.user{

display:flex;

align-items:center;

gap:12px;

}



.user h3{

margin:0;

}



.user span{

font-size:13px;

color:#64748b;

}





.route{

display:flex;

gap:10px;

align-items:center;

margin:20px 0;

font-size:17px;

}



.route svg{

color:var(--va-primary);

font-size:22px;

}





.date{

display:flex;

gap:8px;

color:#64748b;

}





.actions{

display:flex;

gap:12px;

margin-top:25px;

}





.empty{

height:300px;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

color:#64748b;

}



.empty svg{

font-size:60px;

}





.loading{

text-align:center;

padding:50px;

}





.spinner{

width:50px;

height:50px;

border-radius:50%;

border:5px solid #ddd;

border-top-color:var(--va-primary);

animation:spin 1s linear infinite;

margin:auto;

}





@keyframes spin{

to{

transform:rotate(360deg);

}

}





@keyframes pop{

from{

opacity:0;

transform:scale(.8);

}

to{

opacity:1;

transform:scale(1);

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