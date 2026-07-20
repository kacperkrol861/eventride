<template>

<div class="page">


<section class="header">


<div>

<h1>
My rides
</h1>


<p>
Manage your created rides and trips you joined.
</p>


</div>




<VaButton

preset="secondary"

@click="router.push('/dashboard')"

>

<Icon icon="mdi:arrow-left"/>

Back to dashboard

</VaButton>



</section>









<section class="section">


<h2>

🚗 My created rides

</h2>





<div
v-if="!createdRides.length"
class="empty"
>


<Icon icon="mdi:car-off"/>


<p>
You haven't created any rides yet.
</p>


</div>








<div
v-else
class="grid"
>



<VaCard

v-for="ride in createdRides"

:key="ride.id"

class="ride-card"

>



<VaCardContent>


<div class="top">


<h3>

{{ ride.from }}

→

{{ ride.to }}

</h3>



<VaChip color="primary">

Driver

</VaChip>



</div>







<div class="info">


<p>

<Icon icon="mdi:calendar"/>

{{ formatDate(ride.date) }}

</p>



<p>

<Icon icon="mdi:account-group"/>

{{ ride.seats }} seats

</p>



<p>

<Icon icon="mdi:calendar-star"/>

{{ ride.event?.title }}

</p>



</div>




</VaCardContent>


</VaCard>




</div>


</section>









<section class="section">


<h2>

👥 Joined rides

</h2>







<div

v-if="!joinedRides.length"

class="empty"

>


<Icon icon="mdi:account-off"/>


<p>
You haven't joined any rides yet.
</p>


</div>








<div

v-else

class="grid"

>



<VaCard

v-for="ride in joinedRides"

:key="ride.id"

class="ride-card"

>



<VaCardContent>


<div class="top">


<h3>

{{ ride.from }}

→

{{ ride.to }}

</h3>



<VaChip color="success">

Joined

</VaChip>



</div>








<div class="info">


<p>

<Icon icon="mdi:calendar"/>

{{ formatDate(ride.date) }}

</p>



<p>

<Icon icon="mdi:account"/>

Driver:

{{ ride.driver?.name }}

</p>



<p>

<Icon icon="mdi:calendar-star"/>

{{ ride.event?.title }}

</p>



</div>




</VaCardContent>


</VaCard>



</div>



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

getMyRides

} from "@/api/ride.api";




const router = useRouter();



const createdRides = ref([]);

const joinedRides = ref([]);





const loadRides = async()=>{


try{


const response = await getMyRides();



createdRides.value =
response.data.createdRides || [];



joinedRides.value =
response.data.joinedRides || [];



}
catch(error){


console.log(error);


}



};








const formatDate=(date)=>{


if(!date)

return "";



return new Date(date)

.toLocaleString(

"pl-PL"

);


};






onMounted(loadRides);



</script>









<style scoped>


.page{

animation:fade .3s ease;

}





.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:35px;

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







.section{

margin-bottom:45px;

}





.section h2{

font-size:24px;

font-weight:800;

margin-bottom:20px;

}






.grid{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(320px,1fr)

);


gap:20px;


}








.ride-card{


border-radius:20px;


transition:.25s;


}



.ride-card:hover{


transform:translateY(-5px);


box-shadow:

0 15px 35px rgba(0,0,0,.12);


}







.top{


display:flex;

justify-content:space-between;

align-items:center;

gap:10px;


}





.top h3{


margin:0;

font-size:19px;


}






.info{


margin-top:20px;


display:flex;

flex-direction:column;

gap:10px;


}





.info p{


display:flex;

align-items:center;

gap:10px;

margin:0;

color:#475569;


}





.info svg{


color:var(--va-primary);

font-size:20px;


}






.empty{


height:180px;

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

color:#64748b;


}




.empty svg{


font-size:55px;


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


gap:15px;


}


}



</style>