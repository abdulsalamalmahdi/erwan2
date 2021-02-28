<template>
  <v-app class="app_con">
    <Nav class="nav" v-if="!isMobile" />
    <NavDrawer v-if="isMobile" />
    <v-main v-if="!this.$route.path.includes('album')" :class="!isMobile ? 'main' : 'main_mob'">
      <v-container :class="isMobile ? 'img_cols_mob' : 'img_cols'" fluid>
        <transition name="slide" mode="out-in">
           <router-view :isMobile="isMobile" :key="$route.params.id"></router-view>
        </transition>
       
      </v-container>
    </v-main>
    <v-main v-if="this.$route.path.includes('album')" :class="!isMobile ? 'main_album' : 'main_mob_album'">
      <v-container :class="isMobile ? 'img_cols_mob' : 'img_cols'" fluid>
        <router-view :isMobile="isMobile" :key="$route.path"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import AlbumForm from './components/AlbumForm';
// import AlbumList from "./components/AlbumsList";
import Nav from "./components/Nav";
import NavDrawer from "./components/NavDrawer";

export default {
  name: "App",
  data: () => ({
    isMobile: false,
    showNav: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
  }),
  mounted:function(){
  },
  created: function () {
    this.handleView();
    
  },

  methods: {
    handleView() {
      this.isMobile = window.innerWidth <= 990;
    },
  },
  components: {
    Nav,
    NavDrawer,
    // AlbumForm,
    // AlbumList,
  },
};
</script>
 <style scoped>
.nav {
  position: fixed;
  z-index: 9;
  width: 100%;
}
/* .v-main {
  display: flex;
  flex: 1 0 auto;
  max-width: 51%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-end;
} */
.app_con {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 100%;
  
}
.v-main.main{
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  max-width: 100%;
  
  align-self: center;
padding: 0px;
 margin-top: 3%;
  margin-right: 4rem;
}
.main_album.v-main[data-v-7ba5bd90] {
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  max-width: 100%;
  /* transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1); */
  align-self: center;
padding: 0px;
 margin-top: 3%;
  /* background-color: red; */
  margin-right: 4rem;
}
.img_cols_mob {
 margin-top: 0rem;
    max-width: 100%;
    overflow: hidden;
}
.img_cols {
  margin-left: 2rem;
}
.main_mob{
display: flex;
    flex: 1 0 auto;
    max-width: 100%;
    transition: 0.2s;
    margin-left: -2%;
    margin-top: 12%;
}
.v-main__wrap{
  margin-right: 3rem;
}
.main_mob_album{
padding: 0px;
    width: 100%;
    position: absolute;
    overflow: scroll;
    height: 100%;
    margin-top:13%
}
.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-30%);
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

</style>