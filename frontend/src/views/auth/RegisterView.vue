<template>
  <div class="register-page">

    <AuthCard>

      <h2 class="title">
        Create account
      </h2>

      <p class="subtitle">
        Join EventRide today
      </p>


      <VaForm @submit.prevent="handleRegister">

        <VaInput
          v-model="name"
          label="Name"
          class="input-field"
          :rules="[required]"
        />


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
          Register
        </VaButton>


      </VaForm>


      <div class="login">

        Already have an account?

        <RouterLink to="/login">
          Login
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
import { register } from "@/api/auth.api";


const router = useRouter();


const name = ref("");
const email = ref("");
const password = ref("");

const loading = ref(false);
const showPassword = ref(false);


const required = (value) => {

  return !!value || "This field is required";

};



const handleRegister = async () => {

  try {

    loading.value = true;


    await register({

      name: name.value,
      email: email.value,
      password: password.value

    });


    router.push("/login");


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

.register-page {

  min-height:100vh;

  display:flex;

  justify-content:center;

  align-items:center;

  padding:24px;

  background:var(--va-background-primary);

}


.title {

  text-align:center;

  font-size:30px;

  font-weight:700;

  color:var(--va-text-primary);

  margin-bottom:8px;

}


.subtitle {

  text-align:center;

  color:var(--va-text-secondary);

  margin-bottom:28px;

}


.input-field {

  margin-bottom:18px;

}


.password-icon {

  cursor:pointer;

  color:var(--va-text-secondary);

}


.password-icon:hover {

  color:var(--va-primary);

}


.login {

  margin-top:24px;

  text-align:center;

  color:var(--va-text-secondary);

}


.login a {

  margin-left:5px;

  color:var(--va-primary);

  font-weight:600;

  text-decoration:none;

}

</style>