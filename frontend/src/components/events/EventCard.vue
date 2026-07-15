<template>

<VaCard
 class="event-card"
 @click="$router.push(`/events/${event.id}`)"
>


<VaCardContent>


<h3>
{{event.title}}
</h3>


<div class="location">
📍 {{event.location}}
</div>


<div class="date">
{{formatDate(event.date)}}
</div>


<VaButton
 size="small"
 color="primary"
>
View details
</VaButton>


</VaCardContent>


</VaCard>

</template>


<script setup>

defineProps({

event:{
 type:Object,
 required:true
}

});


const formatDate=(date)=>{

return new Date(date)
.toLocaleDateString(
"pl-PL"
);

};


</script>


<style scoped>

.event-card{

cursor:pointer;

border-radius:18px;

transition:.25s;

}


.event-card:hover{

transform:translateY(-5px);

}


.location{

margin-top:12px;

color:var(--va-primary);

font-weight:600;

}


.date{

margin:8px 0 18px;

color:var(--va-text-secondary);

}

</style>