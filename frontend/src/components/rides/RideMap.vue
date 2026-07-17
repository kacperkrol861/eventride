<template>

  <div class="map-wrapper">


    <div
      ref="map"
      class="map"
    ></div>



  </div>

</template>




<script setup>


import {
  ref,
  onMounted,
  onBeforeUnmount
} from "vue";


import L from "leaflet";


import "leaflet/dist/leaflet.css";





const props = defineProps({

  from:{

    type:Object,

    required:true

  },


  to:{

    type:Object,

    required:true

  }

});





const map = ref(null);


let leafletMap;



onMounted(()=>{


  leafletMap =
    L.map(
      map.value
    );




  L.tileLayer(

    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

      maxZoom:19,

      attribution:
      "&copy; OpenStreetMap"

    }

  )
  .addTo(
    leafletMap
  );





  const start = [

    props.from.lat,

    props.from.lng

  ];



  const end = [

    props.to.lat,

    props.to.lng

  ];






  const line =

    L.polyline(

      [

        start,

        end

      ],

      {

        weight:4

      }

    )
    .addTo(
      leafletMap
    );






  L.marker(start)

    .addTo(
      leafletMap
    )

    .bindPopup(
      "Start"
    );






  L.marker(end)

    .addTo(
      leafletMap
    )

    .bindPopup(
      "Destination"
    );





  leafletMap.fitBounds(

    line.getBounds(),

    {

      padding:[50,50]

    }

  );



});






onBeforeUnmount(()=>{


  if(leafletMap){

    leafletMap.remove();

  }


});



</script>






<style scoped>


.map-wrapper{

width:100%;

}



.map{

height:400px;

border-radius:18px;

overflow:hidden;

}



</style>