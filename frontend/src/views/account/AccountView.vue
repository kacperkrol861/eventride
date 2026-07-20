<template>

<div class="account-page">


<section class="header">


<div>

<h1>
My account
</h1>


<p>
Manage your profile and activity.
</p>


</div>




<VaButton

preset="secondary"

@click="router.push('/dashboard')"

>

<Icon icon="mdi:arrow-left"/>

Back to dashboard

</VaButton>



</section>









<VaCard class="profile-card">


<VaCardContent>


<div class="profile">


<VaAvatar

color="primary"

size="90px"

>

{{ userInitial }}

</VaAvatar>





<div class="details">


<h2>
{{ user?.name }}
</h2>



<p>
{{ user?.email }}
</p>



</div>



</div>






</VaCardContent>


</VaCard>









<section class="cards">



<VaCard
v-for="stat in statistics"

:key="stat.label"

class="stat-card"

>


<VaCardContent>


<Icon
:icon="stat.icon"
/>


<div>

<strong>
{{ stat.value }}
</strong>


<span>
{{ stat.label }}
</span>


</div>



</VaCardContent>


</VaCard>



</section>









<VaCard class="information-card">


<VaCardContent>


<h2>
Account information
</h2>






<div class="item">


<Icon icon="mdi:account-outline"/>


<div>

<span>
Name
</span>


<strong>
{{ user?.name }}
</strong>


</div>


</div>







<div class="item">


<Icon icon="mdi:email-outline"/>


<div>

<span>
Email
</span>


<strong>
{{ user?.email }}
</strong>


</div>


</div>







<div class="item">


<Icon icon="mdi:shield-check-outline"/>


<div>

<span>
Account status
</span>


<strong>
Active
</strong>


</div>


</div>





</VaCardContent>


</VaCard>



</div>

</template>



<script setup>

import {
  computed,
  ref,
  onMounted
} from "vue";


import {
  useRouter
} from "vue-router";


import {
  Icon
} from "@iconify/vue";


import {
  useAuthStore
} from "@/stores/auth.store";


import {
  getAccountStatistics
} from "@/api/auth.api";



const router = useRouter();


const auth = useAuthStore();




const user = computed(()=>{

  return auth.user;

});





const userInitial = computed(()=>{


  return user.value?.name
    ?.charAt(0)
    ?.toUpperCase();


});







const statsData = ref({

  createdRides:0,

  joinedRides:0,

  eventsCreated:0,

  pendingRequests:0,

  acceptedRequests:0,

  rejectedRequests:0

});








const statistics = computed(()=>[


{

label:"Created rides",

value:statsData.value.createdRides,

icon:"mdi:car-multiple"

},



{

label:"Joined rides",

value:statsData.value.joinedRides,

icon:"mdi:account-group"

},



{

label:"Events created",

value:statsData.value.eventsCreated,

icon:"mdi:calendar-star"

},



{

label:"Pending requests",

value:statsData.value.pendingRequests,

icon:"mdi:clock-outline"

},



{

label:"Accepted requests",

value:statsData.value.acceptedRequests,

icon:"mdi:check-circle"

},



{

label:"Rejected requests",

value:statsData.value.rejectedRequests,

icon:"mdi:close-circle"

}



]);









const loadStatistics = async()=>{


try{


const response = await getAccountStatistics();


statsData.value = response.data;



}
catch(error){


console.log(error);


}


};






onMounted(loadStatistics);



</script>








<style scoped>


.account-page{

animation:fade .3s ease;

}





.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:30px;

}





.header h1{

font-size:32px;

font-weight:800;

margin:0;

}





.header p{

margin-top:8px;

color:#64748b;

}







.profile-card{

border-radius:20px;

margin-bottom:25px;

}





.profile{

display:flex;

align-items:center;

gap:25px;

}





.details h2{

margin:0;

font-size:28px;

}





.details p{

margin-top:8px;

color:#64748b;

}









.cards{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(220px,1fr)

);


gap:20px;


margin-bottom:25px;


}






.stat-card{


border-radius:18px;


}




.stat-card :deep(.va-card__content){


display:flex;


align-items:center;


gap:18px;


}





.stat-card svg{


font-size:35px;


color:var(--va-primary);


}





.stat-card strong{


display:block;


font-size:28px;


}





.stat-card span{


color:#64748b;


font-size:14px;


}








.information-card{


border-radius:20px;


max-width:700px;


}





.information-card h2{


margin-bottom:20px;


}







.item{


display:flex;


align-items:center;


gap:15px;


padding:15px 0;


border-bottom:1px solid #eee;


}





.item:last-child{


border-bottom:none;


}





.item svg{


font-size:24px;


color:var(--va-primary);


}





.item span{


display:block;


font-size:13px;


color:#64748b;


}





.item strong{


display:block;


margin-top:3px;


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


.header{


flex-direction:column;


align-items:flex-start;


gap:15px;


}





.profile{


flex-direction:column;


align-items:flex-start;


}



}



</style>