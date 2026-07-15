<template>
  <div class="event-detail">

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
  getEvents
} from "@/api/event.api";

import {
  getRides
} from "@/api/ride.api";

import RideCard from "@/components/rides/RideCard.vue";


const route = useRoute();

const event = ref(null);

const rides = ref([]);



const loadData = async()=>{

  try{

    const eventsResponse = await getEvents();

    const ridesResponse = await getRides();


    event.value =
      eventsResponse.data.find(
        e => e.id == route.params.id
      );


    rides.value =
      Array.isArray(ridesResponse.data)
      ? ridesResponse.data
      : [];


  }catch(error){

    console.log(error);

  }

};



const eventRides = computed(()=>{

  if(!event.value)
    return [];


  return rides.value.filter(
    ride =>
      ride.eventId === event.value.id
  );

});



const formatDate = (date)=>{

  return new Date(date)
    .toLocaleString(
      "pl-PL"
    );

};



onMounted(loadData);

</script>


<style scoped>

.event-detail{
  animation:fade .3s ease;
}

.hero{
  padding:35px;
  border-radius:20px;
  background:linear-gradient(
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
  font-size:15px;
}

.rides{
  margin-top:40px;
}

.rides h2{
  font-size:26px;
}

.rides-grid{
  display:grid;
  grid-template-columns:repeat(
    auto-fit,
    minmax(280px,1fr)
  );
  gap:20px;
  margin-top:20px;
}

.empty{
  text-align:center;
  color:var(--va-text-secondary);
  margin-top:30px;
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