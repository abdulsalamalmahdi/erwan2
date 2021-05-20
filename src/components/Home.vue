<template>
  <v-container
    align="center"
    :class="
      isMobile
        ? 'fluid mt-0 ml-2 pa-0 grey lighten-5 container_mobile'
        : 'fluid ml-0 mr-0 pa-0 grey lighten-5 container_nor'
    "
  >
    <v-row :class="isMobile ? 'row-mob' : 'row_nor'">
      <!-- gallery -->

      <ImageModal
    @fetchImgs='fetchImgs'
        v-if="!isMobile"
        @close="close"
        :isMobile="isMobile"
        :image="viewImage"
        :dialog="image_dialog"
      />

      <ImageModalMob
        v-if="isMobile"
        @close="close"
        :isMobile="isMobile"
        :image="viewImage"
        :dialog="image_dialog"
      />
      <v-col
        v-for="n in images"
        :key="n._id"
        class="d-flex child-flex ma-0 pa-0"
        :cols="isMobile ? 4 : 1"
      >
        <!-- <img v-lazy="require(`../../${n.url.replace('./', '')}`)" > -->
        <v-img
          @click="open(n)"
          @close="close"
        
          :src="require(`../../${n.url.replace('./', '')}`)"
          aspect-ratio="1"
          class="grey lighten-2"
        >
       
         <v-btn v-if="!n.album && isAdmin" icon color="primary" @click="deleteImg(n)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageModalMob from "./ImageModalMob";
import axios from "axios";
import ImageModal from "./ImageModal";
export default {
  name: "Home",
  data: () => ({
    image_dialog: false,
    viewImage: {},
    selectedItem: 0,
    albums: [],
    images: [],
    exibitions: [],
    projects: [],
  }),
  props: {
    isMobile: {
      type: Boolean,
    },
  },
  mounted: function () {
    // console.log(this.image_dialog);


    axios
      .get(`/albums/`,{headers:{
          'Content-Type': 'application/json'
      }})
      .then((data) => {
      //  console.log(data);
        this.albums = data.data;
      })
      .catch((err) => err);

    axios
      .get(`/images/`)
      .then((data) => {
        console.log(data.data);
        this.images = data.data;
      })
      .catch((err) => err);

    axios
      .get(`/albums/exibitions`)
      .then((dt) => {
        this.exibitions = dt.data;
      //  console.log(this.exibitions);
      })
      .catch((err) => err);

    axios
      .get(`/albums/projects`)
      .then((dt) => {
        this.projects = dt.data;
      })
      .catch((err) => err);
    this.images.map((n) => console.log(n._id));
    
  },
  methods: {
    fetchImgs(){
      // console.log('home emitted')
       axios
      .get(`/images/`)
      .then((data) => {
        // console.log(data.data);
        this.images = data.data;
      })
      .catch((err) => err);
    },
    close() {
      this.dialog = false;
      this.viewImage = {};
      // console.log(this.viewImage);
      // console.log(this.dialog);
    },
    scale(e) {
      e.target.style.transform = "scale(1.1)";
    },
    unScale(e) {
      e.target.style.transform = "scale(1)";
    },
    goToAlbum(_id) {
      this.$router.push(`/album/${_id}`);
    },
    open(n) {
      this.image_dialog = true;
      this.viewImage = n;
      
      // console.log(this.viewImage);
      // console.log(this.image_dialog);
    },
     deleteImg(n) {
      let img = this.images.find((im) => im._id === n._id);
      if (img) {
        const ind = this.images.indexOf(img);
        this.images.splice(ind, 1);
      }
      console.log(n.album)

      axios
        .delete(`/image/${n._id}`, {
          name: n.album|| 'random',
        })
        .then((dt) => {
           console.log("deleted "+dt.data);


          this.curr_album = dt.data;
          this.images = this.curr_album.iamges;

          //  this.$forceUpdate()
        })
        .catch((err) => console.log(err));
    },
    log(msg){
      console.log(msg)
    }
  },
  computed: {
    exibitions: function () {
      return this.albums.find((al) => al.category === "exibition");
    },
     isAdmin(){
      return this.$store.getters.loggedIn;
    }
  },
  components: {
    ImageModal,
    ImageModalMob,
  },
};
</script>

<style scoped>
.gallery {
  float: left;
  margin: 0;
  background-color: rgb(224, 223, 223);
  width: 50%;
  height: fit-content;
  overflow: hidden;
}
/* .image {
  transform: scale(1);
  width: 200px;
  height: 200px;
} */
/* .txt {
  position: absolute;
  width: 1000px;
  height: 1000px;
  left: 50%;
  background-color: red;
} */

/* .side_card {
  width: fit-content;
  max-width: fit-content;
} */
/* .drawer {
  width: fit-content;
  max-width: fit-content;
} */
/* .sidebar {
  max-width: 35%;
  position: fixed;
  margin-top: 0.5rem;
} */
.container_mobile {
  max-width: 100%;
  margin-top: 0rem;
  align-items: center;
  margin: 0;
}
.container_nor {
  max-width: 100%;
  margin-top: 2rem;
  align-items: center;
  margin-left: 0;
}
/* .v-list-item__content {
  margin-left: 0;
  overflow: visible;
}
.v-list-item__icon:first-child {
  margin-right: 0.5rem;
}
.v-menu__content {
  max-width: 31%;
} */
.img_cols_mob {
  margin: 0;
  margin-top: 0;
  width: 100%;
  max-width: 100%;
  padding: 0;
}
.gal_col {
  width: 100%;
  margin-left: 2rem;
  margin-top: 1rem;
}
.row {
  width: 100%;
  max-width: 100%;
  margin: 0;
}

</style>