<template>
  <div class="logout-page">

    <div class="logout-card">

      <div class="logo">
        EventRide
      </div>


      <div class="icon">

        <Icon icon="mdi:logout" />

      </div>


      <h1>
        See you next time 👋
      </h1>


      <p>
        Thank you for using EventRide.
        We hope to see you again soon.
      </p>


      <div class="loader">

        <div
          class="progress"
          :style="{ width: progress + '%' }"
        />

      </div>


      <span>
        Logging you out...
      </span>


    </div>

  </div>
</template>


<script setup>

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import { useAuthStore } from "@/stores/auth.store";


const router = useRouter();

const auth = useAuthStore();

const progress = ref(0);


onMounted(()=>{


  auth.logout();


  const interval = setInterval(()=>{


    progress.value += 2;


    if(progress.value >= 100){


      clearInterval(interval);


      setTimeout(()=>{

        router.push("/login");

      },600);


    }


  },50);


});


</script>


<style scoped>

.logout-page {

  min-height:100vh;

  display:flex;

  justify-content:center;

  align-items:center;

  background:
    radial-gradient(
      circle at top,
      #eef4ff,
      #f8fafc
    );

}


.logout-card {

  max-width:450px;

  width:90%;

  text-align:center;

  animation:fade .8s ease;

}


.logo {

  display:inline-flex;

  padding:12px 25px;

  background:var(--va-primary);

  color:white;

  border-radius:16px;

  font-size:28px;

  font-weight:800;

  margin-bottom:35px;

}


.icon {

  width:80px;

  height:80px;

  margin:auto;

  border-radius:50%;

  display:flex;

  align-items:center;

  justify-content:center;

  background:#eef2ff;

  color:var(--va-primary);

  font-size:40px;

  animation:rotate .8s ease;

}


h1 {

  margin-top:25px;

  font-size:32px;

  font-weight:800;

  color:#1e293b;

}


p {

  margin-top:15px;

  color:#64748b;

  line-height:1.6;

}


.loader {

  margin-top:35px;

  height:10px;

  background:#e2e8f0;

  border-radius:20px;

  overflow:hidden;

}


.progress {

  height:100%;

  background:var(--va-primary);

  transition:.05s linear;

}


span {

  display:block;

  margin-top:15px;

  color:#64748b;

  font-weight:600;

}


@keyframes fade {

  from {

    opacity:0;

    transform:translateY(30px);

  }


  to {

    opacity:1;

  }

}


@keyframes rotate {

  from {

    transform:rotate(-180deg);

    opacity:0;

  }


  to {

    transform:rotate(0);

    opacity:1;

  }

}

</style>