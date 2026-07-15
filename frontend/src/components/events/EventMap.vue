<template>
  <div class="map-container">

    <l-map
      v-model:zoom="zoom"
      :center="center"
    >

      <l-tile-layer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      <l-marker
        v-for="marker in markers"
        :key="marker.city"
        :lat-lng="[marker.lat,marker.lng]"
        :icon="createIcon(marker.count)"
      >

        <l-popup>

          <strong>
            {{ marker.city }}
          </strong>

          <br>

          {{ marker.count }} events

        </l-popup>

      </l-marker>


    </l-map>

  </div>
</template>


<script setup>

import { ref } from "vue";

import {
 LMap,
 LTileLayer,
 LMarker,
 LPopup
} from "@vue-leaflet/vue-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


defineProps({

 markers:{
  type:Array,
  default:()=>[]
 }

});


const zoom=ref(6);


const center=[
 52.1,
 19.4
];


const createIcon=(count)=>{


 return L.divIcon({

  className:"custom-marker",

  html:`
    <div class="marker">
      ${count}
    </div>
  `,

  iconSize:[45,45],

  iconAnchor:[22,45]

 });


};


</script>


<style scoped>

.map-container {

 height:500px;

 border-radius:20px;

 overflow:hidden;

 box-shadow:
  0 10px 30px rgba(0,0,0,.08);

}


:deep(.marker){

 width:42px;

 height:42px;

 background:#2563eb;

 color:white;

 border-radius:50%;

 display:flex;

 align-items:center;

 justify-content:center;

 font-weight:800;

 font-size:16px;

 border:4px solid white;

 box-shadow:
 0 5px 15px rgba(0,0,0,.25);

}


@media(max-width:768px){

 .map-container{

  height:320px;

 }

}

</style>