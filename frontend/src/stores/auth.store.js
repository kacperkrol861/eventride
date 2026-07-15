import { defineStore } from "pinia";
import { login } from "@/api/auth.api";


export const useAuthStore = defineStore("auth", {

    state: () => ({

        user: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,

        token: localStorage.getItem("token") || null

    }),


    actions: {


        async login(credentials) {

            const response = await login(credentials);


            this.token = response.data.token;

            this.user = response.data.user;


            localStorage.setItem(
                "token",
                this.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(this.user)
            );

        },


        logout() {

            this.user = null;

            this.token = null;


            localStorage.removeItem(
                "token"
            );


            localStorage.removeItem(
                "user"
            );

        }

    },


    getters: {


        isAuthenticated(state) {

            return !!state.token;

        }


    }

});