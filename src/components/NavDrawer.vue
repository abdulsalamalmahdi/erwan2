<template>

  <div class="drawer">
    <v-app-bar color="white" class="black--text" dense dark>
      <v-menu  offset-y >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
      
            v-bind="attrs"
            v-on="on"
            class="mx-2 menu_btn mr-2"
            fab
            small
            dark
            color="#e6f4ff"
          >
            <v-icon dark> mdi-format-list-bulleted-square </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-menu nudge-top="30" nudge-right="110" nudge-width="50" transition="slide-y-transition" offset-y>
                <template  v-slot:activator="{ on, attrs }">
                  <v-btn  text color="primary" dark v-bind="attrs" v-on="on">
                    EXIBITIONS
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, i) in exibitions" :key="i">
                    <v-list-item-title>
                      <router-link  class="link" :to="'/album/'+ item.category+'/' + item._id">{{
                        item.name
                      }}</router-link></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu></v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-menu nudge-top="30" nudge-right="110" nudge-width="50" transition="slide-y-transition" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary" dark v-bind="attrs" v-on="on">
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
          </v-list-item>
          <v-list-item>
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">
              <router-link class="link" to="/bio">BIOGRAPHIE</router-link>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">
              <router-link class="link" to="/text">TEXT</router-link>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">
              <router-link class="link" to="/workshop">WORKSHOPS</router-link>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">
              <router-link class="link" to="/contact">CONTACT</router-link>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title class="tip">
           <router-link class="link" to="/home"
          >ERWAN MAHEO</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NavDrawer",

  mounted: function () {
    console.log(this.hide_main_menu)
    axios
      .get(`/albums/exibitions`)
      .then((dt) => {
        this.exibitions = dt.data;
     //   console.log(this.exibitions);
      })
      .catch((err) => err);

    axios
      .get(`/albums/projects`)
      .then((dt) => {
        this.projects = dt.data;
      })
      .catch((err) => err);
  },
  data() {
    return {
      hide_main_menu:false,
      drawer: false,
      group: null,
      exibitions: [],
      projects: [],
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  
};
</script>

<style scoped>
.title {
  text-align: center;
}
.side_card {
  width: fit-content;
  max-width: fit-content;
}
.drawer {
  position: absolute;
  height: fit-content;
  max-height: 10%;
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  z-index: 6;
  width: 100%;
  max-width: 100%;
}
.sidebar {
  max-width: 35%;
  position: fixed;
  margin-top: 0.5rem;
}
.container_mobile {
  max-width: 100%;
  margin-top: -2rem;
}
.container {
  max-width: 100%;
}
.v-list-item__content {
  margin-left: 0;
  overflow: visible;
}
.v-list-item__icon:first-child {
  margin-right: 0.5rem;
}
.v-menu__content {
  max-width: 31%;
}
.listItemIcon {
  margin: 0;
}
.v-list-item {
  width: fit-content;
}
.v-application .title {
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  font-family: "Roboto", sans-serif !important;
}
.v-menu__content[data-v-6c5cc5f4] {
  max-width: fit-content;
}
.link {
  text-decoration: none;
  color:black;
}
.btn {
  text-decoration: none;
  margin-left: 2rem;
}
.menu_btn {
  opacity: 0.5;
}
.theme--dark.v-btn {
  color: #000000;
}
.tip{
      left: 32%;
    position: absolute;
}
</style>