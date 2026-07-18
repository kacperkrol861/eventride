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


<VaBadge

v-if="count"

:content="count"

color="danger"

/>


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


console.log("MY RIDE REQUESTS:", response.data);


requests.value =
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






const count = computed(()=>{


return requests.value.filter(

r => r.status === "PENDING"

).length;


});







const openRequests = ()=>{


router.push("/my-requests");


};







onMounted(loadNotifications);



</script>







<style scoped>


.bell{


position:relative;

cursor:pointer;

font-size:25px;

display:flex;

align-items:center;


}




.bell :deep(.va-badge){


position:absolute;

top:-8px;

right:-12px;


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





.notification svg{


font-size:24px;

color:var(--va-primary);


}





.notification p{


margin:5px 0;

font-size:14px;


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