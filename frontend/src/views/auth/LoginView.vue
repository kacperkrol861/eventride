<template>
  <div class="login-page">
    <AuthCard>

      <h2 class="title">
        Welcome back
      </h2>

      <p class="subtitle">
        Sign in to continue your journey
      </p>

      <VaForm @submit.prevent="handleLogin">

        <VaInput
          v-model="email"
          label="Email"
          type="email"
          class="input-field"
          :rules="[required]"
        />

        <VaInput
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field"
          :rules="[required]"
        >
          <template #appendInner>
            <Icon
              :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
              width="22"
              class="password-icon"
              @click="showPassword = !showPassword"
            />
          </template>
        </VaInput>

        <VaButton
          block
          size="large"
          :loading="loading"
          type="submit"
        >
          Login
        </VaButton>

      </VaForm>

      <div class="register">
        Don't have an account?

        <RouterLink to="/register">
          Create account
        </RouterLink>
      </div>

    </AuthCard>
  </div>
</template>


<script setup>

import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

import AuthCard from "@/components/common/AuthCard.vue";
import { useAuthStore } from "@/stores/auth.store";


const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);


const auth = useAuthStore();
const router = useRouter();


const required = (value) => {
  return !!value || "This field is required";
};


const handleLogin = async () => {

  try {

    loading.value = true;


    await auth.login({
      email: email.value,
      password: password.value
    });


    router.push("/dashboard");


  } catch(error) {

    console.log(
      error.response?.data || error.message
    );


  } finally {

    loading.value = false;

  }

};

</script>


<style scoped>

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: var(--va-background-primary);
}


.title {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: var(--va-text-primary);
  margin-bottom: 8px;
}


.subtitle {
  text-align: center;
  color: var(--va-text-secondary);
  margin-bottom: 28px;
}


.input-field {
  margin-bottom: 18px;
}


.password-icon {
  cursor: pointer;
  color: var(--va-text-secondary);
  transition: .2s;
}


.password-icon:hover {
  color: var(--va-primary);
}


.register {
  margin-top: 24px;
  text-align: center;
  color: var(--va-text-secondary);
}


.register a {
  margin-left: 5px;
  color: var(--va-primary);
  font-weight: 600;
  text-decoration: none;
}

</style>