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
        <v-img
          @click="open(n)"
          @close="close"
          :src="
            n.image_name.split('.')[1] === 'jpeg'
              ? require(`../../${n.url.replace('./', '')}`)
              : n.base64
          "
          aspect-ratio="1"
          class="grey lighten-2"
        >
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
    console.log(this.image_dialog);
    axios
      .get(`http://localhost:4000/api/albums/`)
      .then((data) => {
        console.log(data);
        this.albums = data.data;
      })
      .catch((err) => err);

    axios
      .get(`http://localhost:4000/api/images/`)
      .then((data) => {
        console.log(data.data);
        this.images = data.data;
      })
      .catch((err) => err);

    axios
      .get(`http://localhost:4000/api/albums/exibitions`)
      .then((dt) => {
        this.exibitions = dt.data;
        console.log(this.exibitions);
      })
      .catch((err) => err);

    axios
      .get(`http://localhost:4000/api/albums/projects`)
      .then((dt) => {
        this.projects = dt.data;
      })
      .catch((err) => err);
    this.images.map((n) => console.log(n._id));
  },
  methods: {
    close() {
      this.dialog = false;
      this.viewImage = {};
      console.log(this.viewImage);
      console.log(this.dialog);
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
      this.viewImage = n;
      this.image_dialog = true;
      console.log(this.viewImage);
      console.log(this.image_dialog);
    },
  },
  computed: {
    exibitions: function () {
      return this.albums.find((al) => al.category === "exibition");
    },
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