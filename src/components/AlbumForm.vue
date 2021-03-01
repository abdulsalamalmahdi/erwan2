<template>
  <div id="app">
    <!-- delete album dialog-->
    <div class="text-center">
      <v-dialog
        v-model="delete_edit"
        :width="curr_album._id ? 337 : 'fit-content'"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="delete_btn"
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon> mdi-delete-outline </v-icon>
          </v-btn>
        </template>

        <v-card class="text-center">
          <v-sheet
            class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
            color="blue-grey darken-3"
            dark
          >
            <div
              v-if="curr_album._id"
              class="grey--text text--lighten-1 text-body-2 mb-4"
            >
              Are you sure you want to delete this album?
            </div>
            <div v-else class="grey--text text--lighten-1 text-body-2 mb-4">
              album has been deletetd !
            </div>
            <v-btn
              v-if="curr_album._id"
              :disabled="loading"
              class="ma-1"
              color="grey"
              plain
              @click="() => (delete_edit = false)"
            >
              Cancel
            </v-btn>

            <v-btn
              v-if="curr_album._id"
              :loading="loading"
              class="ma-1"
              color="error"
              plain
              @click="deleteAlbum"
            >
              Delete
            </v-btn>
            <v-btn
              v-if="!curr_album._id"
              :loading="loading"
              class="ma-1"
              color="error"
              plain
              @click="OK"
            >
              Ok
            </v-btn>
          </v-sheet>
        </v-card>
      </v-dialog>
    </div>
    <!-- album card -->

    <v-card class="mx-auto my-12 mt-2 ml-24" max-width="50%">
      <!-- :src="main.image_name.split('.')[1] === 'jpeg'? require(`../../${main.url.replace('./', '')}`):main.base64" -->
      <v-img
        class="white--text align-end"
        v-if="main"
        height="200px"
        :src="require(`../../${main.url.replace('./', '')}`)"
      >
        <v-card-title v-text="curr_album.category"></v-card-title>
      </v-img>

      <v-img
        class="white--text align-end"
        v-else
      :src="require('../assets/image-placeholder.png')"
      >
        <v-card-title v-text="curr_album.category"></v-card-title
      ></v-img>

      <!-- -->
      <v-card-title>
        {{ curr_album.name }}
      </v-card-title>
      <v-card-subtitle
        ><strong> description: </strong><br />{{
          description ? description : curr_album.description
        }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> Add Description </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-col cols="12" md="6">
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              auto-grow
              counter="4000"
              v-model="description"
              placeholder="add multiple lines"
              hint="Hint text"
              @change="description ? submitDes : null"
              >{{ curr_album.description }}</v-textarea
            >
          </v-col>

          <v-btn color="primary" text @click="submitDes"> Submit </v-btn>
        </div>
      </v-expand-transition>
    </v-card>

    <!-- drag and drop area before upload -->
    <v-card class="mb-6">
      <div class="dropZone_container" v-if="!filesArr.length > 0">
        <div
          :class="['dropZone', dragging ? 'dropZone-over' : '']"
          @dragenter="dragging = true"
          @dragleave="dragging = false"
          @dragover="dragging = true"
        >
          <div class="dropZone-info" @drag="onChange">
            <span class="fa fa-cloud-upload dropZone-title"></span>
            <span class="dropZone-title">Drop file or click to upload</span>
            <div class="dropZone-upload-limit-info">
              <div>extension support: txt</div>
              <div>maximum file size: 5 MB</div>
            </div>
          </div>

          <input
            ref="image_uploads"
            type="file"
            id="image_uploads"
            name="image_uploads"
            @change="onChange"
            multiple
          />
        </div>
      </div>
      <!-- end of drog and drop area -->

      <!-- drog and drop area after upload -->
      <div v-else class="dropZone-uploaded">
        <div class="dropZone-uploaded-info">
          <span class="dropZone-title">{{
            filesArr.length + " files uploaded"
          }}</span>
          <v-btn
            colos="red"
            small
            type="button"
            class="btn btn-primary removeFile"
            @click="removeFile"
          >
            Remove all Files
          </v-btn>
          <v-btn
            color="green"
            small
            type="button"
            class="btn btn-primary removeFile"
            @click="supmit"
          >
            supmit Files
          </v-btn>
        </div>
      </div>
      <!-- drag and drop area after upload -->
      <div>
        <!-- extentions err dialog -->
        <v-row justify="center">
          <v-dialog v-model="showDialog" persistent max-width="300">
            <v-card>
              <v-card-title class="red--text headline">
                unfalid file extensions!
              </v-card-title>
              <v-card-text v-for="el in notJPG" :key="el.name">
                <strong>{{ el.name }}</strong> is not an JPEG file type and has
                been removed</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="showDialog = false">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- linear progress -->

        <v-progress-linear
          v-if="filesArr.length > 0"
          class="bar"
          v-model="uploaded"
          color="green"
          height="25"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        <v-card v-if="filesArr.length > 0" width="250" color="grey">
          <div v-for="nm in filesArr" :key="nm">
            {{ "Uploaded: " + nm.name }}
          </div>
        </v-card>

       <!-- previwe area  -->

        <v-row no-gutters>
          <v-col
            v-for="(file, index) in filesArr"
            :key="index"
            cols="12"
            sm="1"
            class="ml-2 mt-6 mb"
          >
            <v-card outlined tile width="100" height="100">
              <v-tooltip class="btn_overlay" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="btn_overlay"
                    color="red"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="removeSelected(file)"
                  >
                    mdi-close
                  </v-icon>
                </template>
                <span>Cancel</span>
              </v-tooltip>
              <v-img class="img_prev" :src="file.url" />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <!-- images list -->

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{
              main.main
                ? "main image has been removed"
                : "main images has been Added"
            }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="accept"> I accept </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col
        v-for="n in curr_album.images"
        :key="n._id"
        class="d-flex child-flex"
        cols="6"
      >
        <!-- dialog -->

        <!-- checkbox -->
        <v-checkbox
          v-model="n.main"
          :value="n.main"
          :disabled="main.main && n._id !== main._id ? true : false"
          color="primary"
          @change="submitMain(n)"
          hide-details
        ></v-checkbox>

        <!-- images -->
        <!-- <v-img
         
          :src="
         n.image_name &&   n.image_name.split('.')[1] === 'jpeg'
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
        </v-img> -->
        <v-card class="mx-auto my-12 mt-2 ml-2" max-width="50%">
          <!-- :src="main.image_name.split('.')[1] === 'jpeg'? require(`../../${main.url.replace('./', '')}`):main.base64" -->
          <v-img
            :src="require(`../../${n.url.replace('./', '')}`)"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-btn icon color="primary" @click="deleteImg(n)">
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
          <div>
            <v-divider></v-divider>
            <!-- <v-col cols="24" md="6">
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  auto-grow
                  counter="20"
                  v-model="caption"
                  placeholder="add multiple lines"
                  hint="Add Caption"
                  @change="caption ? submitCap : null"
                  >{{ caption }}</v-textarea
                >
              </v-col> -->
            <v-card class="mb-2">{{ n.caption }}</v-card>
            <v-divider></v-divider>
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              auto-grow
              counter="20"
              placeholder="add caption"
              hint="Add Caption"
              v-model="n.caption"
              @change="n.caption ? submitCap(n, n.caption) : null"
              class="mx-2"
              :key="n._id"
              rows="1"
              prepend-icon="mdi-comment"
            ></v-textarea>

            <v-btn color="primary" text @click="submitCap(n, n.caption)">
              Submit
            </v-btn>
          </div>
        </v-card>
        <!-- end of image -->

        <!-- delete an image -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
// import Dialog from "./Dialog";

export default {
  name: "AlbumForm",
  data: () => ({
    images: [],
    main: {},
    main_id: "",
    disable: false,
    description: "",
    file_name: [],
    per: null,
    file_uploads: "",
    uploadedFiles: null,
    show: false,
    caption: "",
    filesArr: [],
    dragging: false,
    notJPG: [],
    showDialog: false,
    curr_album: {},
    album_name: "",
    loading: false,
    dialog: false,
    delete_edit: false,
  }),
  mounted: function () {
    axios
      .get(`/album/${this.$route.params._id}`)
      .then((dt) => {
      
        this.curr_album = dt.data;
        this.images = this.curr_album.images;
      })
      .catch((err) => console.log(err));
  
    axios
      .get(`/image/${this.$route.params._id}`)
      .then((dt) => {
       
        this.main = dt.data;
      })
      .catch((err) => console.log(err));
    console.log(this.curr_album);
  },
  methods: {
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      let objKeys = Object.keys(files);
      let objVals = Object.values(files);

      this.notJPG = notJPG;

      objKeys.map((ok) => {
        this.filesArr.push(files[ok]);
      });

      let notJPG = objVals.filter(
        (fl) => fl.type !== "image/jpeg" && fl.type !== "image/tiff"
      );

      if (notJPG.length > 0) {
        this.notJPG = notJPG;

        // notJPG.map(n=>{ alert(n.name + " is not of type JPEG and removed from your selections")})
        this.showDialog = true;
        this.filesArr = objVals.filter((fl) =>fl.type === "image/jpeg");
      }
      console.log(this.filesArr);
      this.filesArr.map(async (file) => {
        Object.assign(file, { url: URL.createObjectURL(file) });
        Object.assign(file, { ext: file.name.split(".").pop() });
        Object.assign(file, { album: this.curr_album.name });
      });
    },

    removeFile() {
      this.filesArr = [];
      this.url = null;
    },
    async supmit() {
      const formData = new FormData();
      this.filesArr.map((fl) => {
        formData.append("file[]", fl);
      });

      console.log(formData);
      try {
        await axios
          .post(
            `/album/${this.$route.params._id}`,
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
    submitDes() {
      console.log("des");

      axios
        .post(`/album/${this.$route.params._id}`, {
          desc: this.description,
        })
        .then(async (dt) => {
          console.log(dt);
          this.description = await dt.data.description;
        })
        .catch((err) => err);
    },

    submitCap(n, cap) {
      console.log(cap);
      axios
        .post(`/image/${n._id}`, {
          caption: cap,
        })
        .then(async (dt) => {
          console.log(dt);

          this.$forceUpdate();
        })
        .catch((err) => err);
    },
    async submitMain(n) {
      this.disable = !this.disable;
      this.main_id = n._id;

      await axios
        .post(`/image/${this.main_id}`, {
          main: !!n.main,
        })
        .then(async (dt) => {
          console.log(dt.data.main);
          this.dialog = true;
          this.main = dt.data;
          console.log(this.main.main);
        })
        .catch((err) => err);
    },
    accept() {
      axios
        .get(`/image/${this.$route.params._id}`)
        .then((dt) => {
          // console.log(dt.data);
          this.main = dt.data;
        })
        .catch((err) => console.log(err));
      this.dialog = false;
      this.$forceUpdate();
      console.log(this.main.main);
    },
    removeSelected(fl) {
      console.log(fl);
      this.file_name.splice(
        this.file_name.indexOf(this.file_name.find((f) => f === fl.name))
      );
      const removedFile = this.filesArr.find((el) => el.url === fl.url);
      let ind = this.filesArr.indexOf(removedFile);

      console.log(ind);
      this.filesArr.splice(ind, 1);
      console.log(this.file_uploads);
      const lngth = this.file_uploads.length;
      for (let ind = 0; ind <= lngth; ind++) {
        if (removedFile.url === this.file_uploads[ind].url) {
          delete this.file_uploads[ind];
        }
      }
      console.log(this.file_uploads);
    },

    deleteAlbum() {
      axios
        .delete(`/album/${this.$route.params._id}`, {
          name: this.curr_album.name,
        })
        .then(() => {
          // console.log(dt.data);
          this.curr_album = {};
        })
        .catch((err) => console.log(err));
      this.delete_edit = false;
      this.delete_edit = true;
    },
    deleteImg(n) {
      let img = this.images.find((im) => im._id === n._id);
      if (img) {
        const ind = this.images.indexOf(img);
        this.images.splice(ind, 1);
      }

      axios
        .delete(`/image/${n._id}`, {
          name: this.curr_album.name,
        })
        .then((dt) => {
          console.log(dt.data);
          this.curr_album = dt.data;
          this.images = this.curr_album.images;

          //  this.$forceUpdate()
        })
        .catch((err) => console.log(err));
    },

    OK() {
      this.delete_edit = false;
      this.$router.push("/admin/album_add");
    },
  },
  computed: {
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : "";
    },
    capCom() {
      return this;
    },
    uploaded() {
      return (this.filesArr.length / this.filesArr.length) * 100;
    },
    // mainVal: function () {
    //   return this.main.main;
    // },
    //     isMain:(vm)=>{
    // return !!vm.main.main;
    //     }
  },
  watch: {
    main: {
      handler(val, old) {
        return console.log({ old: old.main, newv: val.main });
      },
      deep: true,
    },
    caption: {
      handler(val, old) {
        return console.log({ old: old.main, newv: val.main });
      },
      deep: true,
    },
    curr_album: {
      deep: true,
      handler: function (val, oldVal) {
        console.log(val, oldVal);
        this.images = this.curr_album.images;
      },
    },
  },

  components: {
    // Dialog
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  margin: 1rem;
  left: -42%;
  position: relative;
}
.newalbum {
  background-color: gray;
  color: rgb(255, 255, 255);
}
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
  margin: 1rem;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
.uploadedFile-info {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  width: 77%;
  height: 200px;
  padding: 1rem;
}
.img_prev {
  width: inherit;
  height: inherit;
  margin-right: 1rem;
}
.info-container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 30%;
}
.info-container div {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border: 1px solid black;
  background-color: #3dabdf;
  text-align: left;
  margin-bottom: 1rem;
  padding: 1rem;
}
.shit {
  width: 100px;
  height: 100px;
  position: relative;
  background-color: red;
}
.btn_overlay {
  cursor: pointer;
  position: absolute;
  width: 15px;
  height: 15px;
  z-index: 9999;
}
.bar {
  margin: 2rem;
  width: 70%;
}
.checkbox {
  cursor: pointer;
  position: absolute;
  width: 15px;
  height: 15px;
  z-index: 9999;
  bottom: 90%;
  left: 75%;
}

.main_input {
  opacity: 0;
  position: absolute;
  width: 100%;
}
.delete_btn {
  position: absolute;
  top: 1%;
  left: 20%;
}
.del_img_btn {
  position: relative;
}
.dropZone_container {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1%;
}
</style>
