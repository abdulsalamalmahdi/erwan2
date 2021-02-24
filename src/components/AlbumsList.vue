<template>
  <div>
    <!-- error dialog -->
    <v-row justify="center">
      <v-dialog v-model="errors" persistent max-width="300">
        <v-card>
          <v-card-title class="red--text headline"> Error </v-card-title>
          <v-card-text>{{ serverError }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="errors = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- success dialon -->
    <v-row justify="center">
      <v-dialog v-model="success" persistent max-width="300">
        <v-card>
          <v-card-title class="red--text headline"> success </v-card-title>
          <v-card-text>{{ album_name }} Album has been added!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="success = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- album menu -->
    <div class="list text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Add Album</v-btn>
        </template>
        <v-list>
          <v-list-item class="newalbum">
            <span @click="newAlbum = true" class="newalbum">
              add new album</span
            >
          </v-list-item>
          <v-list-item v-for="(album, index) in albums" :key="index">
            <v-list-item-title @click="chosedAbum(album)">
              {{ album.name }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <!-- end of album menu -->
    <!-- upload dialog -->

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
     
      <v-card>
       <v-file-input
       type="file"
      small-chips
      multiple
      label="File input w/ small chips"
      @change="onChange"
    ></v-file-input>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="supmit"
          >
            upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
<!-- add random image -->

   <v-btn
     
      color="blue-grey"
      class="ma-2 white--text img_up"
      @click="dialog = 'true'"
    >
      images
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  

    <!-- album form -->
    <v-form
      class="ml-6"
      v-if="newAlbum"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row class="addAblum_row">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            class="shrink"
            v-model="album_name"
            label="Write album name"
            :rules="nameRules"
            required
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-combobox
            clearable
            solo
            v-model="select"
            :items="categories"
            label="Category"
            chips
            @change="combox"
          >
            <template v-slot:selection="categories">
              <v-chip
                :key="JSON.stringify(categories.item)"
                v-bind="categories.attrs"
                :input-value="categories.selected"
                :disabled="categories.disabled"
                @click:close="categories.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="categories.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ categories.item }}
              </v-chip>
            </template>
          </v-combobox>
          <!-- <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn> -->
        </v-col>
        <v-btn color="blue" :disabled="!valid" @click="validate"> add </v-btn>

        <v-btn class="ml-2" color="red" @click="newAlbum = false">
          cancel
        </v-btn>
      </v-row>
    </v-form>
    <!-- end of album form -->
    <!-- albums list -->
    <v-card class="mx-auto" max-width="300" tile>
      <v-list dense>
        <v-subheader> Album</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(album, i) in albums" :key="i">
            <v-list-item-content>
              <v-list-item-title @click="chosedAbum(album)"
                >{{ album.name }}
                <v-chip x-small v-if="album.category" class="ma-2">
                  {{ album.category }}
                </v-chip></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AlbumList",
  data: () => ({
    select: "",
    categories: ["exibition", "project", "workshop"],
    show: false,
    success: false,
    errors: "",
    selectedItem: 1,
    albums: [],
    newAlbum: false,
    album_name: "",
    category: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 30 || "Name must be less than 30 characters",
    ],
    valid: true,
    current_album: "",
    dialog:false,
    filesArr:[],
  }),
  mounted() {
    console.log(this.select);
    axios
      .get("http://localhost:4000/api/albums")
      .then(async (dt) => {
        this.albums.push(...dt.data);
        console.log(this.albums[0].name);
      })
      .catch((err) => {
        this.errors = err.message;
        console.log(this.errors);
      });
  },
  methods: {
    onChange(e) {
      let files = e
    

      
      let objKeys = Object.keys(files);
     

     

      objKeys.map((ok) => {
        this.filesArr.push(files[ok]);
      });
console.log(this.filesArr)
      // let notJPG = objVals.filter(
      //   (fl) => fl.type !== "image/jpeg" && fl.type !== "image/tiff"
      // );

      // if (notJPG.length > 0) {
      //   this.notJPG = notJPG;

      //   // notJPG.map(n=>{ alert(n.name + " is not of type JPEG and removed from your selections")})
      //   this.showDialog = true;
      //   this.filesArr = objVals.filter((fl) =>fl.type === "image/jpeg");
      // }
      // console.log(this.filesArr);
      this.filesArr.map(async (file) => {
        Object.assign(file, { url: URL.createObjectURL(file) });
        Object.assign(file, { ext: file.name.split(".").pop() });
        Object.assign(file, { album: 'random' });
      });
    },
async supmit() {
  this.dialog= false;
      const formData = new FormData();
      this.filesArr.map((fl) => {
        formData.append("file[]", fl);
      });

      console.log(formData);
      try {
        await axios
          .post(
            `http://localhost:4000/api/album/random`,
            formData
          )
          .then((result) => {
            this.curr_album = result.data;
          })
          .catch((err) => err);
        this.filesArr = [];
      } catch (err) {
        console.log(err);
      }
    },
    async validate() {
      this.$refs.form.validate();
      await axios
        .post("http://localhost:4000/api/albums", {
          name: this.album_name,
          category: this.select,
        })
        .then((res) => {
          if (res.status === 200) {
            this.albums.push(res.data);
            this.loading = false;
            this.success = true;

            this.successMsg = "album has been added!";
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          this.serverError = err.response.data;
          this.errors = true;
          this.successMsg = "";
        });
      this.newAlbum = false;
      this.album_name = "";
      console.log(this.albums);
    },
    chosedAbum(album) {
      console.log(album._id);
      this.current_album = album;
      this.$router.push(`/admin/album/${album.category}/${album._id}`);
    },
    combox() {
      console.log(this.select);
    },
  },
  watch:{
    albums:{
      handler:function(){
        
      },
      deep:true,
    }

  }
};
</script>
<style lang="scss" scoped>
.list {
  margin: 3rem;
  left: -42%;
  position: relative;
}
.img_up{
  left: 6.5%;
  position: absolute;
}
.newalbum {
  background-color: gray;
  color: rgb(255, 255, 255);
}
.addAblum_row{
  display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
    align-items: baseline;

}
</style>
