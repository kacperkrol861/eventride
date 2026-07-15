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
            icon="mdi:calendar"
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
            {{ ride.seats }} seats
          </span>

        </div>



        <div class="item">

          <Icon
            icon="mdi:account"
          />

          <span>
            {{ ride.driver?.name }}
          </span>

        </div>


      </div>



      <div class="footer">


        <VaChip
          color="primary"
          size="small"
        >

          Available

        </VaChip>



        <VaButton
          size="small"
          color="primary"
          @click="requestRide"
        >

          Join ride

        </VaButton>


      </div>


    </VaCardContent>


  </VaCard>
</template>


<script setup>

import { Icon } from "@iconify/vue";


const props = defineProps({

  ride:{
    type:Object,
    required:true
  }

});



const formatDate = (date)=>{

  return new Date(date)
    .toLocaleDateString(
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



const requestRide = ()=>{

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

  gap:6px;

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

  margin-top:20px;

  display:flex;

  justify-content:space-between;

  align-items:center;

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


}


</style>