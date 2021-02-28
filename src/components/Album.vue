<template >
  <div v-if="!isMobile">
    <div class="controllers_nor">
      <v-btn @click="prev" small>
        <v-icon> mdi-arrow-left-bold-outline </v-icon>
      </v-btn>
      <v-card class="slide">
        {{ album.name }}
      </v-card>
      <v-btn @click="next" small>
        <v-icon> mdi-arrow-right-bold-outline </v-icon>
      </v-btn>
    </div>

    <v-card shaped class="mx-auto ma-2v album_card" max-width="80%">
      <v-card-title>
        <div class="title">{{ album.name }}</div>
      </v-card-title>
      <v-img
        class="white--text align-end main_image"
        v-if="main"
        :src="
          main.image_name && main.image_name.split('.')[1] === 'jpeg'
            ? require(`../../${main.url.replace('./', '')}`)
            : main.base64
        "
        height="300px"
      >
      </v-img>
      <v-img
        v-else
        src="http://www.wonderauto.ch/application/modules/themes/views/default/assets/images/image-placeholder.png"
      >
      </v-img>
      <v-card-subtitle>
        {{ album.createdAt }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> Description</v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>

      <v-expand-transition>
        <div>
          <v-divider></v-divider>

          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            optio autem dolore itaque nihil vel illum excepturi hic labore
            obcaecati atque dicta tempora velit odio, ipsam necessitatibus
            laudantium molestiae culpa!
            {{ album.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card v-for="n in album.images" :key="n._id" elevation="0" class="images mx-auto mb-16">
      <!-- "show textArea" -->
      <v-btn
        v-if="isAdmin"
        @click="showDescFormFunc(n)"
        class="mx-2 add_desc"
        fab
        dark
        color="indigo"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>

      <v-img
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
     <v-card  elevation="0"> {{ n.caption }}</v-card>
       
    
      <v-divider></v-divider>
      <!-- description form  -->
      <v-card
        v-if="
          el_textAreaArr.find((el) => el === n) &&
          el_textAreaArr.find((el) => el.show === true)
        "
      >
        <v-container fluid>
          <v-textarea
            @change="n.desc ? addDesc(n, n.desc) : null"
            class="mx-2"
            :key="n._id"
            clearable
            clear-icon="mdi-close-circle"
            label="Text"
            v-model="n.desc"
          ></v-textarea>
        </v-container>
        <v-btn @click="addDesc(n, n.desc)" block elevation="2"> Add </v-btn>
      </v-card>
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-card-text class="describtion_card" v-if="n.desc">
        {{ n.desc }}
      </v-card-text>
    </v-card>
  </div>
  <!-- mobile -->
  <div v-else class="mobile_album_div">
    <div class="controllers">
      <v-btn @click="prev" small>
        <v-icon> mdi-arrow-left-bold-outline </v-icon>
      </v-btn>
      <v-card class="slide">
        {{ album.name }}
      </v-card>
      <v-btn @click="next" small>
        <v-icon> mdi-arrow-right-bold-outline </v-icon>
      </v-btn>
    </div>

    <v-card class="mx-auto ma-2v album_card_mob" max-width="100%">
      <v-card-title class="title_card_mob">
        <div class="title_mob">{{ album.name }}</div>
      </v-card-title>
      <v-img
        class="white--text align-end main_image_mob"
        v-if="main"
        :src="
          main.image_name && main.image_name.split('.')[1] === 'jpeg'
            ? require(`../../${main.url.replace('./', '')}`)
            : main.base64
        "
        height="300px"
      >
        <v-card-title
          class="card_category_mob"
          v-text="album.category"
        ></v-card-title
      ></v-img>
      <v-img
        v-else
        src="http://www.wonderauto.ch/application/modules/themes/views/default/assets/images/image-placeholder.png"
      >
        <v-card-title v-text="album.category"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> Description</v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>

      <v-expand-transition>
        <div>
          <v-divider></v-divider>

          <v-card-text class="text_card_mob">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
            neque natus nostrum voluptatum quos minima animi suscipit eius saepe
            voluptatem molestiae, temporibus repellendus fugiat iusto itaque
            dignissimos assumenda corporis omnis!
            {{ album.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <div class="images_mob">
      <v-card v-for="n in album.images" :key="n._id" class="mx-auto ma-2">
        <v-img
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

        <v-card elevation="0">
          {{ n.caption }}
        </v-card>
        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AlbumForm",
  data: () => ({
    describtion: "",
    isMobile: false,
    album: {},
    exibitions: [],
    projects: [],
    el_textArea: {
      show: false,
    },
    el_textAreaArr: [],
  }),

  created: function () {
    this.handleView();
  },

  methods: {
    addDesc(n, desc) {
      console.log(desc);
      axios
        .put(`/image/${n._id}`, { desc: desc })
        .then((dt) => {
          console.log(dt.data);
            this.el_textArea = n;
      this.el_textArea.show = !this.el_textArea.show;
      this.el_textAreaArr.push(this.el_textArea);
      console.log(this.el_textAreaArr);
          this.description = dt.data.desc;
        })
        .catch((err) => console.log(err));
       
      
    },
    showDescFormFunc(n) {
      this.el_textArea = n;
      this.el_textArea.show = !this.el_textArea.show;
      this.el_textAreaArr.push(this.el_textArea);
      console.log(this.el_textAreaArr);
    },
    handleView() {
      this.isMobile = window.innerWidth <= 990;
    },
    prev() {
      let i = this[this.album.category + "s"].findIndex((el) => {
        return el.name === this.album.name;
      });
      console.log(i);
      if (i <= this[this.album.category + "s"].length -1 && i >= 0) {
        i--;
        console.log(i);
        this.$router.push(
          `/album/${this.album.category}/${
            this[this.album.category + "s"][i]._id
          }`
        );
      }
    },
    next() {
      let i = this[this.album.category + "s"].findIndex((el) => {
        return el.name === this.album.name;
      });

      console.log(i);
      if (i <= this[this.album.category + "s"].length -1) {
        i++;
        this.$router.push(
          `/album/${this.album.category}/${
            this[this.album.category + "s"][i++]._id
          }`
        );
      }

    },
  },
  mounted: function () {
  
    console.log("mounted");
    console.log(this.$route.params._id);
    console.log(this.isMobile);
    axios
      .get(`/album/${this.$route.params._id}`)
      .then((dt) => {
        console.log(dt.data);
        this.album = dt.data;
      })
      .catch((err) => console.log(err));

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
    console.log(this.album);
  },

  computed: {
    main: function () {
      return this.album.images.find((im) => im.main === true);
    },
  
    isAdmin(){
      return this.$store.getters.loggedIn;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .title {
  position: relative;
  align-self: center;
left: 46%;
} */
.images {
  position: relative;
  width: 50%;
  height: fit-content;

}
.album_card {
  margin-top: 3rem;
  max-width: 50%;
  width: 50%;
  margin-bottom: 3rem;
}
.title_mob {
  align-self: center;
}
.title_card_mob {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  padding: 0;
  justify-content: center;
}
.images_mob {
  position: relative;
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin-bottom: 5%;
}
.album_card_mob {
  max-width: 100%;
  width: 100%;
  margin-top: 0;
  margin-bottom: 5%;
}

.text_card_mob {
  padding: 0.3rem;
}
.card_category_mob {
  margin-left: 1rem;
}
.mobile_album_div {
  max-width: 100%;
  width: 100%;
}

.slide {
  text-align: center;
  width: 59%;
}
.controllers {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-bottom: 4%;
}
.controllers_nor {
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.v-card__title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  justify-content: center;
  word-break: break-all;
}
.add_desc {
  position: absolute;
  z-index: 2;
}
.describtion_card {
  max-height: 100%;
  height: 100%;
  z-index: 6;
  margin-top: 2%;

  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
