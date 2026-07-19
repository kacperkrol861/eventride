<template>

<VaDropdown placement="bottom-end">

  <template #anchor>

    <div
      class="bell"
      @click="loadNotifications"
    >

      <Icon
        icon="mdi:bell-outline"
      />


      <span
        v-if="count > 0"
        class="badge"
      >

        {{ count }}

      </span>


    </div>

  </template>




  <VaDropdownContent>


    <div class="notifications">


      <h3>
        Notifications
      </h3>





      <div
        v-if="!requests.length"
        class="empty"
      >

        No notifications

      </div>







      <div
        v-for="item in requests.slice(0,3)"
        :key="item.id"
        class="notification"
      >



        <Icon
          icon="mdi:account-plus"
        />




        <div>


          <strong>

            {{ item.user?.name }}
            wants to join

          </strong>




          <p>

            {{ item.ride?.from }}

            →

            {{ item.ride?.to }}

          </p>




          <span>

            {{ item.status }}

          </span>




        </div>




      </div>







      <VaButton

        block

        size="small"

        color="primary"

        @click="openRequests"

      >

        View more


      </VaButton>





    </div>



  </VaDropdownContent>



</VaDropdown>


</template>







<script setup>


import {

  ref,

  computed,

  onMounted

} from "vue";



import {

  useRouter

} from "vue-router";



import {

  Icon

} from "@iconify/vue";



import {

  getMyRideRequests

} from "@/api/request.api";





const router = useRouter();




const requests = ref([]);








const loadNotifications = async()=>{


  try{


    const response = await getMyRideRequests();



    requests.value = Array.isArray(response.data)

      ?

      response.data

      :

      [];



  }


  catch(error){


    console.log(error);


  }



};









const count = computed(()=>{


  return requests.value.filter(

    request => request.status === "PENDING"

  ).length;



});









const openRequests = ()=>{


  router.push("/my-ride-requests");


};








onMounted(loadNotifications);



</script>








<style scoped>


.bell{


  position:relative;


  width:38px;


  height:38px;


  display:flex;


  align-items:center;


  justify-content:center;


  cursor:pointer;


  transition:.2s;



}






.bell:hover{


  transform:scale(1.08);



}






.bell svg{


  font-size:25px;


  color:#475569;



}






.badge{


  position:absolute;


  top:-3px;


  right:-3px;



  min-width:18px;


  height:18px;


  padding:0 5px;


  border-radius:999px;



  background:#ef4444;


  color:white;



  font-size:11px;


  font-weight:700;



  display:flex;


  align-items:center;


  justify-content:center;



  border:2px solid white;


  line-height:1;



}






.notifications{


  width:340px;


  padding:15px;



}






.notifications h3{


  margin-bottom:15px;



}






.notification{


  display:flex;


  gap:12px;


  padding:12px 0;


  border-bottom:1px solid #eee;



}






.notification:last-child{


  border-bottom:none;



}






.notification svg{


  font-size:22px;


  color:var(--va-primary);



}






.notification strong{


  display:block;


  font-size:14px;



}






.notification p{


  margin:4px 0;


  font-size:13px;


  color:#475569;



}






.notification span{


  font-size:12px;


  color:#64748b;



}






.empty{


  text-align:center;


  padding:20px;


  color:#64748b;



}



</style>