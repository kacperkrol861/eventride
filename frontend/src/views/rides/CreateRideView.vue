<template>

  <div class="create-ride">


    <section class="header">

      <h1>
        Create ride
      </h1>

      <p>
        Offer a ride to participants attending your event.
      </p>

    </section>





    <VaCard class="form-card">


      <VaCardContent>


        <div class="form">





          <div>


            <label class="field-label">

              <Icon icon="mdi:calendar-star"/>

              Event

            </label>



            <VaSelect

              v-model="selectedEventId"

              placeholder="Choose an event..."

              text-by="title"

              value-by="id"

              :options="events"

              @update:modelValue="onEventChange"

            />



          </div>








          <div>


            <label class="field-label">

              <Icon icon="mdi:map-marker"/>

              Destination

            </label>



            <VaInput

              :model-value="form.to"

              readonly

              disabled

              placeholder="Select event first"

            />



            <small v-if="selectedEvent">

              Location comes from selected event

            </small>



          </div>









          <div>


            <label class="field-label">

              <Icon icon="mdi:map-marker-outline"/>

              Departure

            </label>




            <VaInput

              v-model="form.from"

              placeholder="e.g. Poznań"

            />



          </div>









          <div>


            <label class="field-label">

              <Icon icon="mdi:calendar-outline"/>

              Event date

            </label>




            <VaInput

              :model-value="formattedDate"

              readonly

              disabled

              placeholder="Select event first"

            />



            <small v-if="selectedEvent">

              Date is fixed by event

            </small>



          </div>









          <div>


            <label class="field-label">

              <Icon icon="mdi:clock-outline"/>

              Departure time

            </label>




            <VaInput

              v-model="form.time"

              placeholder="17:30"

            />



          </div>









          <div>


            <label class="field-label">

              <Icon icon="mdi:seat-passenger"/>

              Available seats

            </label>




            <VaInput

              v-model.number="form.seats"

              type="number"

              min="1"

              max="8"

            />



          </div>









          <VaButton


            color="primary"


            size="large"


            :loading="loading"


            :disabled="

              !selectedEventId ||

              !form.from ||

              !form.time ||

              !form.seats

            "


            @click="submit"


          >


            <span class="button-content">


              <Icon icon="mdi:car-outline"/>


              Create ride


            </span>



          </VaButton>






        </div>



      </VaCardContent>



    </VaCard>



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


import {
  useRouter
} from "vue-router";


import {
  getEvents
} from "@/api/event.api";


import {
  createRide
} from "@/api/ride.api";





const router = useRouter();





const loading = ref(false);


const events = ref([]);


const selectedEventId = ref(null);


const selectedEvent = ref(null);






const form = ref({


  from:"",


  to:"",


  date:"",


  time:"",


  seats:3


});









const loadEvents = async()=>{


  try{


    const response =
      await getEvents();



    events.value =

      Array.isArray(response.data)

      ?

      response.data

      :

      [];



  }
  catch(error){


    console.log(error);


  }


};









const onEventChange = ()=>{


  selectedEvent.value =

    events.value.find(

      event =>

      Number(event.id) === Number(selectedEventId.value)

    );






  if(!selectedEvent.value){


    form.value.to = "";

    form.value.date = "";


    return;


  }






  form.value.to =

    selectedEvent.value.location;






  form.value.date =

    new Date(

      selectedEvent.value.date

    )

    .toISOString()

    .split("T")[0];



};









const formattedDate = computed(()=>{


  if(!form.value.date){

    return "";

  }





  return new Date(form.value.date)

    .toLocaleDateString(

      "en-US",

      {


        day:"numeric",

        month:"long",

        year:"numeric"


      }


    );


});









const submit = async()=>{


  if(!selectedEventId.value){

    return;

  }




  try{


    loading.value=true;





    const payload = {


      eventId:

        Number(selectedEventId.value),



      from:

        form.value.from.trim(),



      to:

        form.value.to,



      date:

        form.value.date,



      time:

        form.value.time,



      seats:

        Number(form.value.seats)


    };






    console.log(
      "Creating ride:",
      payload
    );






    await createRide(payload);





    router.push("/rides");




  }
  catch(error){


    console.log(

      error.response?.data || error

    );


  }
  finally{


    loading.value=false;


  }



};









onMounted(loadEvents);



</script>







<style scoped>


.create-ride{


  max-width:900px;

  margin:auto;

  animation:fade .3s ease;


}







.header{


  margin-bottom:30px;


}







.header h1{


  margin:0;

  font-size:32px;

  font-weight:800;


}







.header p{


  margin-top:8px;

  color:var(--va-text-secondary);


}







.form-card{


  border-radius:20px;

  box-shadow:

  0 10px 30px rgba(0,0,0,.06);


}







.form{


  display:flex;

  flex-direction:column;

  gap:22px;


}







.field-label{


  display:flex;

  align-items:center;

  gap:8px;

  margin-bottom:8px;

  font-weight:600;


}







.field-label svg{


  color:var(--va-primary);

  font-size:20px;


}







small{


  display:block;

  margin-top:6px;

  color:var(--va-text-secondary);

  font-size:13px;


}







.button-content{


  display:flex;

  align-items:center;

  gap:8px;


}







.button-content svg{


  font-size:20px;


}







:deep(.material-icons),
:deep(.material-symbols-outlined),
:deep(.va-icon){


  display:none !important;


}







.button-content svg{


  display:block !important;


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


.header h1{


font-size:26px;


}


}



</style>