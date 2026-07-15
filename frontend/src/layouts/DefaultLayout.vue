<template>
  <div class="app-layout">

    <VaNavbar class="navbar">

      <template #left>
        <RouterLink
          to="/dashboard"
          class="logo"
        >
          <span class="logo-mark">
            E
          </span>

          EventRide
        </RouterLink>
      </template>


      <template #center>

        <nav class="menu">

          <RouterLink to="/dashboard">
            Dashboard
          </RouterLink>


          <RouterLink to="/events">
            Events
          </RouterLink>


          <RouterLink to="/rides">
            Rides
          </RouterLink>

        </nav>

      </template>


      <template #right>

        <VaDropdown placement="bottom-end">

          <template #anchor>

            <VaAvatar
              color="primary"
              size="36px"
              class="avatar"
            >
              {{ userInitial }}
            </VaAvatar>

          </template>


          <VaDropdownContent>

            <div class="dropdown">


              <div class="profile">

                <VaAvatar
                  color="primary"
                  size="42px"
                >
                  {{ userInitial }}
                </VaAvatar>


                <div>

                  <strong>
                    {{ user?.name }}
                  </strong>


                  <span>
                    {{ user?.email }}
                  </span>

                </div>


              </div>


              <VaDivider />


              <VaButton
                preset="secondary"
                size="small"
                block
                @click="logout"
              >
                Logout
              </VaButton>


            </div>

          </VaDropdownContent>


        </VaDropdown>


      </template>


    </VaNavbar>



    <main class="content">

      <RouterView />

    </main>


  </div>

</template>


<script setup>

import { computed } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";


const auth = useAuthStore();

const router = useRouter();


const user = computed(() => auth.user);


const userInitial = computed(() => {

  return user.value?.name
    ?.charAt(0)
    ?.toUpperCase();

});


const logout = () => {

  router.push("/logout");

};

</script>


<style scoped>

.app-layout {
  min-height:100vh;
  background:#f8fafc;
}


.navbar {
  height:68px;
  padding:0 32px;
  background:rgba(255,255,255,.9);
  backdrop-filter:blur(12px);
  box-shadow:0 2px 15px rgba(0,0,0,.06);
}


.logo {
  display:flex;
  align-items:center;
  gap:10px;
  font-size:21px;
  font-weight:800;
  letter-spacing:-.5px;
  color:var(--va-primary);
  text-decoration:none;
}


.logo-mark {
  width:32px;
  height:32px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  background:var(--va-primary);
  color:white;
  font-size:18px;
  font-weight:800;
}


.menu {
  display:flex;
  align-items:center;
  gap:36px;
}


.menu a {
  position:relative;
  color:#64748b;
  text-decoration:none;
  font-size:15px;
  font-weight:600;
  transition:.25s;
}


.menu a:hover {
  color:var(--va-primary);
}


.menu a.router-link-active {
  color:var(--va-primary);
}


.menu a.router-link-active::after {
  content:"";
  position:absolute;
  left:0;
  bottom:-10px;
  width:100%;
  height:3px;
  border-radius:20px;
  background:var(--va-primary);
}


.avatar {
  cursor:pointer;
  transition:.25s;
}


.avatar:hover {
  transform:scale(1.08);
}


.content {
  width:100%;
  max-width:1400px;
  margin:auto;
  padding:32px;
}


.dropdown {
  min-width:260px;
  padding:18px;
}


.profile {
  display:flex;
  align-items:center;
  gap:12px;
}


.profile strong {
  display:block;
  font-size:15px;
}


.profile span {
  display:block;
  margin-top:3px;
  font-size:13px;
  color:#64748b;
}


@media(max-width:900px) {

  .navbar {
    padding:0 20px;
  }


  .menu {
    gap:20px;
  }

}


@media(max-width:768px) {

  .navbar {
    padding:0 16px;
  }


  .logo {
    font-size:18px;
  }


  .logo-mark {
    width:28px;
    height:28px;
  }


  .menu {
    display:none;
  }


  .content {
    padding:20px;
  }


  .dropdown {
    min-width:220px;
  }

}

</style>