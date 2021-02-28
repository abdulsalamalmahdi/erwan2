<template>
 
    <v-card class="overflow-hidden">
      
    <v-toolbar dense>
      <v-toolbar-title>
        <router-link class="link" to="/home"
          >ERWAN MAHEO</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="black" dark v-bind="attrs" v-on="on">
            EXIBITIONS
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in exibitions" :key="i">
            <v-list-item-title>
              <router-link class="link" :to="'/album/'+ item.category+'/' + item._id">{{
                item.name
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="black" dark v-bind="attrs" v-on="on">
            projects
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in projects" :key="i">
            <v-list-item-title>
              <router-link class="link" :to="'/album/'+ item.category+'/' + item._id">{{
                item.name
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text color="primary" dark v-bind="attrs" v-on="on">
        <router-link class="link" to="/bio">BIOGRAPHY</router-link>
      </v-btn>
      <!-- <v-btn text color="primary" dark v-bind="attrs" v-on="on">
        <router-link class="link" to="/text">TEXT</router-link>
      </v-btn> -->
     <v-menu transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="black" dark v-bind="attrs" v-on="on">
            workshops
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in workshops" :key="i">
            <v-list-item-title>
              <router-link class="link" :to="'/album/'+ item.category+'/' + item._id">{{
                item.name
              }}</router-link></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text color="primary" dark v-bind="attrs" v-on="on">
        <router-link class="link" to="/contact">CONTACT</router-link>
      </v-btn>
      <v-btn v-if="isAdmin" text color="primary" dark v-bind="attrs" v-on="on">
        <router-link class="link" to="/admin/album_add">Forms </router-link>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="loginFunc">mdi-login-variant</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon v-if="isAdmin" @click="logoutFunc">mdi-logout-variant</v-icon>
      </v-btn>
      <loginForm />
    </v-toolbar>
  </v-card>
  
  
</template>

<script>
import axios from "axios";
import LoginForm from "../components/Auth/Login";
export default {
  name: "Nav",
  data: () => ({
    loggedIn:false,
    login: false,
    albums: [],
    exibitions: [],
    projects: [],
    workshops:[],
  }),
  mounted: function () {
    console.log(this.isAdmin)
    this.loggedIn = this.$store.getters.loggedIn;
    axios
      .get(`/albums`)
      .then((dt) => {
        console.log(dt);
        this.albums = dt.data;
      })
      .catch((err) => err);

    axios
      .get(`/albums/exibitions`)
      .then((dt) => {
        this.exibitions = dt.data;
        console.log(this.exibitions);
      })
      .catch((err) => err);

    axios
      .get(`/albums/projects`)
      .then((dt) => {
        this.projects = dt.data;
      })
      .catch((err) => err);

       axios
      .get(`/albums/workshops`)
      .then((dt) => {
        this.workshops = dt.data;
      })
      .catch((err) => err);
  },
  created:function(){


  },
  methods: {
    loginFunc() {
      this.$store.dispatch("logIn_action", { login: !this.login });
    },
     logoutFunc() {
       this.$store.dispatch('logout_action')
    this.loggedIn= this.$store.getters.loggedIn;
    },
  },
 
  computed: {
    isAdmin(){
      return this.$store.getters.loggedIn;
    }
  },
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color:black;
}
.btn {
  color: black;
  text-decoration: none;
  margin-left: 2rem;
}
</style>
//src="https://picsum.photos/1920/1080?random"