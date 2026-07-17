<template>

  <div class="rides-page">


    <section class="header">

      <h1>
        Available rides
      </h1>


      <p>
        Find a ride and travel together.
      </p>


    </section>





    <section class="filters">


      <div class="field">

        <div class="field-label">

          <Icon
            icon="mdi:map-marker-path"
          />

          <span>
            Search route
          </span>

        </div>


        <VaInput

          v-model="search"

          placeholder="Warszawa, Kraków..."

        />


      </div>





      <div class="field">


        <div class="field-label">

          <Icon
            icon="mdi:seat-passenger"
          />

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
  Icon
} from "@iconify/vue";


import RideCard from "@/components/rides/RideCard.vue";


import {
  getRides
} from "@/api/ride.api";





const rides = ref([]);


const search = ref("");


const seatFilter = ref("");





const seatOptions = [

  "Any",

  "1+ seats",

  "3+ seats",

  "5+ seats"

];






const loadRides = async()=>{


  try{


    const response =
      await getRides();



    rides.value =
      Array.isArray(response.data)
      ? response.data
      : [];


  }
  catch(error){

    console.log(error);

  }


};







const filteredRides = computed(()=>{


  return rides.value.filter(ride=>{


    const text =
      search.value
      .toLowerCase();




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





.header{

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





/* usuwamy materialowe expand_more */

:deep(.material-icons),
:deep(.material-symbols-outlined),
:deep(.va-icon){

  display:none !important;

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


.filters{

  flex-direction:column;

}



.header h1{

  font-size:26px;

}



}



</style>