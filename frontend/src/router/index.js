import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";

import DefaultLayout from "../layouts/DefaultLayout.vue";
import LogoutView from "../views/auth/LogoutView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";

import DashboardView from "../views/dashboard/DashboardView.vue";

import EventsView from "../views/events/EventsView.vue";
import EventDetailsView from "../views/events/EventDetailsView.vue";
import CreateEventView from "../views/events/CreateEventView.vue";
import RideDetailView from "../views/rides/RideDetailView.vue";
import RideView from "../views/rides/RideView.vue";
import CreateRideView from "../views/rides/CreateRideView.vue";
import myRideRequestView from "../views/rides/myRideRequestView.vue";
import AccountView from "../views/account/AccountView.vue";
import MyRidesView from "../views/rides/MyRidesView.vue";
import MyEventsView from "../views/events/MyEventsView.vue";

const router = createRouter({

    history:createWebHistory(),

    routes:[

        {
            path:"/",
            component:HomeView,
            meta:{
                public:true
            }
        },


        {
            path:"/login",
            component:LoginView,
            meta:{
                public:true
            }
        },

        {
             path:"/logout",
            component:LogoutView
        },

        {
            path:"/register",
            component:RegisterView,
            meta:{
                public:true
            }
        },


        {
            path:"/",
            component:DefaultLayout,

            children:[


                {
                    path:"dashboard",
                    component:DashboardView
                },


                {
                    path:"events",
                    component:EventsView
                },


                {
                    path:"events/create",
                    component:CreateEventView
                },


                {
                    path:"events/:id",
                    component:EventDetailsView
                },

                {
                    path:"rides/:id",
                    component:RideDetailView
                },
                {
                    path:"rides",
                    component:RideView
                },
                
                {
                    path: "rides/create",
                    component: CreateRideView
                },
                {
                     path:"/my-ride-requests",
                    component: myRideRequestView
                },
                {
                    path:"account",
                    component:AccountView
                },
                {
                    path:"my-rides",
                    component:MyRidesView
                },
                {
                    path:"my-events",
                    component:MyEventsView
                }
            ]

        }

    ]

});


router.beforeEach((to)=>{

    const auth = useAuthStore();


    const isPublic = to.matched.some(
        route => route.meta.public
    );


    if(!isPublic && !auth.isAuthenticated){

        return "/login";

    }


    if(
        isPublic &&
        auth.isAuthenticated &&
        (
            to.path === "/login" ||
            to.path === "/register"
        )
    ){

        return "/dashboard";

    }


});


export default router;