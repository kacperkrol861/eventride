<template>

  <VaCard class="auth-card">

    <VaCardContent>

      <AppLogo />

      <div class="content">
        <slot />
      </div>

    </VaCardContent>

  </VaCard>

</template>


<script setup>

import AppLogo from "./AppLogo.vue";

</script>


<style scoped>

.auth-card {
  width:420px;
  border-radius:24px;
  box-shadow:0 20px 60px rgba(0,0,0,.08);
}


.content {

  margin-top: 25px;

}


@keyframes fadeIn {

  from {

    opacity:0;

    transform:translateY(20px);

  }


  to {

    opacity:1;

    transform:translateY(0);

  }

}

</style>