<template>
  <div class="dashboard">

    <section class="hero">
      <div>
        <h1>
          Welcome back, {{ user?.name }} 👋
        </h1>

        <p>
          Plan your events, share rides and travel together.
        </p>
      </div>

      <VaButton
        color="primary"
        size="large"
        @click="router.push('/events/create')"
      >
        Create event
      </VaButton>
    </section>

    <section class="stats">

      <VaCard class="stat-card">
        <VaCardContent>

          <div class="icon blue">
            <Icon icon="mdi:calendar-outline"/>
          </div>

          <div>
            <span>
              Events
            </span>

            <strong>
              {{ loading ? "-" : stats.events }}
            </strong>
          </div>

        </VaCardContent>
      </VaCard>

      <VaCard class="stat-card">
        <VaCardContent>

          <div class="icon green">
            <Icon icon="mdi:car-outline"/>
          </div>

          <div>
            <span>
              Rides
            </span>

            <strong>
              {{ loading ? "-" : stats.rides }}
            </strong>
          </div>

        </VaCardContent>
      </VaCard>

      <VaCard class="stat-card">
        <VaCardContent>

          <div class="icon orange">
            <Icon icon="mdi:account-clock-outline"/>
          </div>

          <div>
            <span>
              Requests
            </span>

            <strong>
              {{ stats.requests }}
            </strong>
          </div>

        </VaCardContent>
      </VaCard>

    </section>

    <section class="quick">

      <h2>
        Quick actions
      </h2>

      <div class="actions">

        <VaCard
          class="action-card"
          @click="router.push('/events')"
        >
          <Icon icon="mdi:magnify"/>

          <span>
            Find events
          </span>
        </VaCard>

        <VaCard
          class="action-card"
          @click="router.push('/events/create')"
        >
          <Icon icon="mdi:plus-circle-outline"/>

          <span>
            Create event
          </span>
        </VaCard>

      </div>

    </section>

  </div>
</template>

<script setup>

import { computed, onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";

import { getEvents } from "@/api/event.api";
import { getRides } from "@/api/ride.api";


const auth = useAuthStore();
const router = useRouter();

const user = computed(() => auth.user);

const loading = ref(true);

const stats = ref({
  events:0,
  rides:0,
  requests:0
});


const loadDashboard = async()=>{

  try{

    const [
      eventsResponse,
      ridesResponse
    ] = await Promise.all([
      getEvents(),
      getRides()
    ]);


    stats.value.events =
      eventsResponse.data.length;


    stats.value.rides =
      ridesResponse.data.length;


  }catch(error){

    console.log(error);

  }finally{

    loading.value = false;

  }

};


onMounted(loadDashboard);

</script>

<style scoped>

.dashboard {
  animation:fade .35s ease;
}

.hero {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:35px;
  border-radius:20px;
  background:linear-gradient(135deg,var(--va-primary),#6c8cff);
  color:white;
}

.hero h1 {
  margin:0;
  font-size:32px;
  font-weight:800;
}

.hero p {
  margin-top:10px;
  opacity:.9;
}

.stats {
  margin-top:30px;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:22px;
}

.stat-card {
  border-radius:18px;
  transition:.25s;
}

.stat-card:hover {
  transform:translateY(-6px);
}

.stat-card .va-card__content {
  display:flex;
  align-items:center;
  gap:20px;
}

.icon {
  width:55px;
  height:55px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
}

.blue {
  background:#e8f0ff;
  color:#2563eb;
}

.green {
  background:#e8fff1;
  color:#16a34a;
}

.orange {
  background:#fff3e8;
  color:#ea580c;
}

.stat-card span {
  display:block;
  color:var(--va-text-secondary);
  font-size:14px;
}

.stat-card strong {
  display:block;
  margin-top:5px;
  font-size:32px;
}

.quick {
  margin-top:40px;
}

.quick h2 {
  font-size:22px;
  font-weight:700;
}

.actions {
  display:flex;
  gap:20px;
  margin-top:20px;
}

.action-card {
  width:220px;
  padding:25px;
  display:flex;
  align-items:center;
  gap:12px;
  cursor:pointer;
  border-radius:16px;
  transition:.25s;
}

.action-card svg {
  font-size:28px;
  color:var(--va-primary);
}

.action-card:hover {
  transform:translateY(-5px);
}

@keyframes fade {

  from {
    opacity:0;
    transform:translateY(15px);
  }

  to {
    opacity:1;
  }

}

@media(max-width:700px) {

  .hero {
    flex-direction:column;
    align-items:flex-start;
    gap:20px;
  }

  .hero h1 {
    font-size:25px;
  }

  .actions {
    flex-direction:column;
  }

  .action-card {
    width:100%;
  }

}

</style>