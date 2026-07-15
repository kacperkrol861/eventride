<template>
  <div class="create-event">

    <section class="header">

      <h1>
        Create event
      </h1>

      <p>
        Create your event and invite people to join.
      </p>

    </section>



    <VaCard class="form-card">

      <VaCardContent>

        <div class="form">


          <div class="field">

            <label>
              <Icon icon="mdi:format-title"/>
              Event title
            </label>

            <VaInput
              v-model="form.title"
              placeholder="Concert, festival, meetup..."
            />

          </div>




          <div class="field">

            <label>
              <Icon icon="mdi:text-box-outline"/>
              Description
            </label>

            <VaTextarea
              v-model="form.description"
              placeholder="Tell people something about this event..."
              rows="5"
            />

          </div>




          <div class="field">

            <label>
              <Icon icon="mdi:map-marker-outline"/>
              Location
            </label>


            <VaSelect
              v-model="form.location"
              placeholder="Choose a city..."
              :options="cities"
              hide-dropdown-icon
            />

          </div>




          <div class="field">

            <label>
              <Icon icon="mdi:calendar-outline"/>
              Date
            </label>


            <VaDateInput
              v-model="form.date"
              placeholder="Choose event date..."
              :clearable="false"
              hide-dropdown-icon
            />

          </div>




          <div class="field">

            <label>
              <Icon icon="mdi:clock-outline"/>
              Time
            </label>


            <VaInput
              v-model="form.time"
              placeholder="18:30"
            />

          </div>





          <VaButton
            color="primary"
            size="large"
            :loading="loading"
            @click="submit"
          >

            <span class="button-content">

              <Icon
                icon="mdi:plus-circle-outline"
              />

              Create event

            </span>


          </VaButton>



        </div>


      </VaCardContent>


    </VaCard>


  </div>
</template>



<script setup>

import {
  ref
} from "vue";


import {
  useRouter
} from "vue-router";


import {
  Icon
} from "@iconify/vue";


import {
  createEvent
} from "@/api/event.api";



const router = useRouter();



const loading = ref(false);



const cities = [

  "Warszawa",
  "Kraków",
  "Gdańsk",
  "Wrocław",
  "Poznań",
  "Łódź",
  "Szczecin",
  "Lublin"

];



const form = ref({

  title:"",

  description:"",

  location:"",

  date:null,

  time:""

});





const submit = async()=>{


  try{


    loading.value=true;



    await createEvent({

      title:form.value.title,

      description:form.value.description,

      location:form.value.location,


      date:
        new Date(form.value.date)
        .toISOString()
        .slice(0,10),


      time:form.value.time

    });



    router.push("/events");



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


</script>




<style scoped>


.create-event{

  animation:fade .3s ease;

  max-width:900px;

  margin:auto;

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

  color:var(--va-text-secondary);

  margin-top:8px;

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





.field{

  display:flex;

  flex-direction:column;

  gap:8px;

}





.field label{

  display:flex;

  align-items:center;

  gap:8px;

  font-size:14px;

  font-weight:600;

  color:var(--va-text-primary);

}



.field label svg{

  font-size:19px;

  color:var(--va-primary);

}




.button-content{

  display:flex;

  align-items:center;

  gap:8px;

}



.button-content svg{

  font-size:20px;

}
:deep(.va-select__dropdown-icon),
:deep(.va-select__icon),
:deep(.va-icon) {
  display:none;
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


.create-event{

  width:100%;

}



.header h1{

  font-size:26px;

}


}


</style>