<template>
  <div class="intro">

    <div class="content">

      <div class="logo">
        EventRide
      </div>


      <h1>
        Welcome to EventRide 🚗
      </h1>


      <p>
        We are preparing your experience.
        You will be redirected to the login page shortly.
      </p>


      <div class="loader">

        <div
          class="progress"
          :style="{ width: progress + '%' }"
        />

      </div>


      <span>
        {{ progress }}%
      </span>


    </div>


  </div>
</template>


<script setup>

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";


const router = useRouter();

const auth = useAuthStore();


const progress = ref(0);


onMounted(()=>{

  const interval = setInterval(()=>{

    progress.value += 2;


    if(progress.value >= 100){

      clearInterval(interval);


      setTimeout(()=>{


        if(auth.isAuthenticated){

          router.push("/dashboard");

        }else{

          router.push("/login");

        }


      },500);

    }


  },50);


});


</script>


<style scoped>

.intro {

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


.content {

  width:90%;

  max-width:500px;

  text-align:center;

  animation:fadeUp .8s ease;

}


.logo {

  display:inline-flex;

  padding:12px 22px;

  border-radius:16px;

  background:var(--va-primary);

  color:white;

  font-size:28px;

  font-weight:800;

  margin-bottom:35px;

  animation:pulse 2s infinite;

}


h1 {

  font-size:34px;

  font-weight:800;

  color:#1e293b;

  margin-bottom:15px;

}


p {

  color:#64748b;

  line-height:1.6;

  margin-bottom:35px;

}


.loader {

  height:10px;

  background:#e2e8f0;

  border-radius:20px;

  overflow:hidden;

}


.progress {

  height:100%;

  background:var(--va-primary);

  border-radius:20px;

  transition:.05s linear;

}


span {

  display:block;

  margin-top:15px;

  color:#64748b;

  font-weight:600;

}


@keyframes fadeUp {

  from {

    opacity:0;

    transform:translateY(30px);

  }


  to {

    opacity:1;

    transform:translateY(0);

  }

}


@keyframes pulse {

  0% {

    transform:scale(1);

  }


  50% {

    transform:scale(1.05);

  }


  100% {

    transform:scale(1);

  }

}


</style>