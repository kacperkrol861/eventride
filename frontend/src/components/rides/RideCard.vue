<template>

  <VaCard class="ride-card">

    <VaCardContent>


      <div class="route">


        <div class="location">

          <Icon
            icon="mdi:map-marker-outline"
          />

          <span>
            {{ ride.from }}
          </span>

        </div>



        <Icon
          class="arrow"
          icon="mdi:arrow-right"
        />



        <div class="location">

          <Icon
            icon="mdi:map-marker"
          />

          <span>
            {{ ride.to }}
          </span>

        </div>


      </div>




      <VaDivider />




      <div class="info">


        <div class="item">

          <Icon
            icon="mdi:calendar-outline"
          />

          <span>
            {{ formatDate(ride.date) }}
          </span>

        </div>




        <div class="item">

          <Icon
            icon="mdi:seat-passenger"
          />

          <span>
            {{ ride.seats }} seats available
          </span>

        </div>




        <div class="item">

          <Icon
            icon="mdi:account-circle-outline"
          />

          <span>
            {{ ride.driver?.name || "Unknown driver" }}
          </span>

        </div>



        <div
          v-if="ride.event"
          class="item"
        >

          <Icon
            icon="mdi:calendar-star"
          />

          <span>
            {{ ride.event.title }}
          </span>

        </div>



      </div>





      <div class="footer">


        <VaChip

          size="small"

          :color="availability.color"

        >

          {{ availability.text }}

        </VaChip>





        <div class="actions">


          <VaButton

            size="small"

            color="secondary"

            @click="viewDetails"

          >

            <Icon
              icon="mdi:information-outline"
            />

            View details

          </VaButton>





          <VaButton

            size="small"

            color="primary"

            :disabled="ride.seats === 0"

            @click="requestRide"

          >

            <Icon
              icon="mdi:car-arrow-right"
            />

            {{ ride.seats === 0 ? "Full" : "Join ride" }}

          </VaButton>


        </div>


      </div>



    </VaCardContent>


  </VaCard>


</template>




<script setup>


import {
  computed
} from "vue";


import {
  useRouter
} from "vue-router";


import {
  Icon
} from "@iconify/vue";



const router = useRouter();



const props = defineProps({

  ride:{

    type:Object,

    required:true

  }

});





const availability = computed(()=>{


  if(props.ride.seats === 0){


    return {

      text:"Full",

      color:"danger"

    };


  }





  if(props.ride.seats <= 3){


    return {

      text:`Only ${props.ride.seats} left`,

      color:"warning"

    };


  }





  return {


    text:"Available",

    color:"success"


  };


});







const formatDate=(date)=>{


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






const viewDetails = ()=>{


  router.push(
    `/rides/${props.ride.id}`
  );


};






const requestRide=()=>{


  console.log(

    "Request ride:",

    props.ride.id

  );


};



</script>






<style scoped>


.ride-card {


  border-radius:18px;

  transition:.25s;

}



.ride-card:hover {


  transform:translateY(-5px);


}





.route {


  display:flex;

  align-items:center;

  gap:12px;

  font-weight:700;

}





.location {


  display:flex;

  align-items:center;

  gap:7px;

}





.location svg {


  color:var(--va-primary);


}





.arrow {


  color:#94a3b8;


}






.info {


  display:flex;

  flex-direction:column;

  gap:12px;


}






.item {


  display:flex;

  align-items:center;

  gap:10px;

  color:var(--va-text-secondary);

  font-size:14px;


}





.item svg {


  color:var(--va-primary);


}






.footer {


  margin-top:25px;

  display:flex;

  justify-content:space-between;

  align-items:center;


}





.actions {


  display:flex;

  gap:10px;

}





.actions button {


  display:flex;

  align-items:center;

  gap:6px;


}






@media(max-width:600px){


.route {


  flex-direction:column;

  align-items:flex-start;


}




.arrow {


  transform:rotate(90deg);


}





.footer {


  flex-direction:column;

  gap:15px;

  align-items:stretch;


}




.actions {


  flex-direction:column;

}



}


</style>