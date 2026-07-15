<template>

  <div class="events-page">


    <section class="header">

      <div>

        <h1>
          Discover events
        </h1>


        <p>
          Find events and join people around your city.
        </p>

      </div>



      <VaButton
        color="primary"
        size="large"
        @click="$router.push('/events/create')"
      >

        Create event

      </VaButton>


    </section>



    <section class="events-layout">



      <div class="map-section">


        <EventMap
          :markers="markers"
        />


      </div>




      <div class="list-section">



        <section class="filters">


          <VaInput

            v-model="search"

            placeholder="Search event name (min. 2 characters)"

            clearable

          />



          <VaInput

            v-model="locationFilter"

            placeholder="Search city (min. 2 characters)"

            clearable

          />


        </section>








        <h2>

          All events

        </h2>




        <div class="events-list">


          <EventCard

            v-for="event in filteredEvents"

            :key="event.id"

            :event="event"

          />


        </div>




        <div

          v-if="!filteredEvents.length"

          class="empty"

        >

          No events found


        </div>



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



import { useRouter } from "vue-router";


import EventMap from "@/components/events/EventMap.vue";

import EventCard from "@/components/events/EventCard.vue";


import { getEvents } from "@/api/event.api";

import { getCoordinates } from "@/api/geocode.api";



const router = useRouter();



const events = ref([]);


const markers = ref([]);



const search = ref("");


const locationFilter = ref("");





const loadEvents = async()=>{


  try{


    const response = await getEvents();



    events.value =

      Array.isArray(response.data)

      ? response.data

      : response.data.events || [];




    await createMarkers();



  }

  catch(error){


    console.log(error);


  }


};







const createMarkers = async()=>{


  const grouped = {};




  for(const event of events.value){



    const coordinates =

      await getCoordinates(

        event.location

      );




    if(!coordinates){

      continue;

    }





    if(!grouped[event.location]){



      grouped[event.location] = {


        city:event.location,


        lat:coordinates.lat,


        lng:coordinates.lng,


        count:0



      };


    }




    grouped[event.location].count++;



  }




  markers.value =

    Object.values(grouped);



};








const filteredEvents = computed(()=>{


  const searchText =

    search.value

      .trim()

      .toLowerCase();




  const locationText =

    locationFilter.value

      .trim()

      .toLowerCase();






  return events.value.filter(event=>{





    const title =

      event.title

      .toLowerCase();





    const location =

      event.location

      .toLowerCase();






    const titleMatch =


      searchText.length < 2

      ||

      title.includes(searchText);






    const locationMatch =


      locationText.length < 2

      ||

      location.includes(locationText);






    return titleMatch && locationMatch;



  });



});







onMounted(loadEvents);



</script>




<style scoped>


.events-page {

  animation:fade .3s ease;

}




.header {


  display:flex;


  justify-content:space-between;


  align-items:center;


  margin-bottom:30px;


}





.header h1 {


  margin:0;


  font-size:32px;


  font-weight:800;


}





.header p {


  margin-top:8px;


  color:var(--va-text-secondary);


}





.events-layout {


  display:grid;


  grid-template-columns:

    minmax(350px,1fr)

    minmax(350px,1fr);


  gap:30px;


}







.map-section {


  position:sticky;


  top:20px;


  height:max-content;


}






.list-section {


  display:flex;


  flex-direction:column;


}






.filters {


  display:flex;


  gap:15px;


  margin-bottom:10px;


}





.filters .va-input {


  flex:1;


}






.filter-info {


  font-size:13px;


  color:var(--va-text-secondary);


  margin-bottom:25px;


}






.list-section h2 {


  margin-bottom:20px;


  font-size:24px;


  font-weight:700;


}






.events-list {


  display:flex;


  flex-direction:column;


  gap:18px;


}






.empty {


  text-align:center;


  margin-top:30px;


  color:var(--va-text-secondary);


}







@keyframes fade {


from {


 opacity:0;


 transform:translateY(10px);


}



to {


 opacity:1;


}


}







@media(max-width:1000px){



.events-layout {


 grid-template-columns:1fr;


}




.map-section {


 position:static;


}




}







@media(max-width:700px){



.header {


 flex-direction:column;


 align-items:flex-start;


 gap:20px;


}





.filters {


 flex-direction:column;


}




}



</style>