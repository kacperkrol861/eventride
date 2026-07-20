<template>

<div class="page">


<section class="header">


<div>

<h1>
My events
</h1>


<p>
Manage events you created.
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








<div

v-if="!events.length"

class="empty"

>


<Icon icon="mdi:calendar-remove"/>


<h3>
No events created
</h3>


<p>
Create your first event.
</p>


</div>









<div

v-else

class="grid"

>



<VaCard

v-for="event in events"

:key="event.id"

class="event-card"

>



<VaCardContent>




<div class="top">


<h2>

{{ event.title }}

</h2>



<VaChip color="primary">

Event

</VaChip>



</div>








<p class="description">

{{ event.description }}

</p>








<div class="info">


<p>

<Icon icon="mdi:map-marker"/>

{{ event.location }}

</p>



<p>

<Icon icon="mdi:calendar"/>

{{ formatDate(event.date) }}

</p>



<p>

<Icon icon="mdi:car"/>

{{ event.rides?.length || 0 }}

rides

</p>


</div>






</VaCardContent>



</VaCard>




</div>






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

getMyEvents

} from "@/api/event.api";




const router = useRouter();



const events = ref([]);





const loadEvents = async()=>{


try{


const response = await getMyEvents();


events.value =
Array.isArray(response.data)

?

response.data

:

[];



}catch(error){

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






onMounted(loadEvents);



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







.grid{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(320px,1fr)

);


gap:20px;


}




.event-card{


border-radius:20px;

transition:.25s;


}



.event-card:hover{


transform:translateY(-5px);


box-shadow:

0 15px 35px rgba(0,0,0,.12);


}






.top{


display:flex;

justify-content:space-between;

align-items:center;

gap:15px;

}



.top h2{


margin:0;

font-size:22px;

}





.description{


margin-top:15px;

color:#64748b;

line-height:1.5;

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


font-size:20px;

color:var(--va-primary);


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