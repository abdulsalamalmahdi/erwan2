<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
      class="mx-2"
      fab
      dark
      large
      color="cyan"
      v-bind="attrs"
      v-on="on"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
         Edit
        </v-card-title>

       <v-textarea
       clearable
          class="mx-2"
          label="caption"
          rows="1"
          prepend-icon="mdi-note-plus-outline"
             v-model="cap"
        ></v-textarea>
        <v-card-actions>
            <v-btn @click="submitCap()">
                submit
            </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios';
  export default {
      name:"NestedModal",
    data () {
      return {
        dialog: false,
        cap:''
      }
    },
    methods:{
        submitCap(){
 axios.post(`http://localhost:4000/api/image/${this.image._id}`, {
          caption: this.cap,
        })
        .then(async (dt) => {
          console.log(dt);
          this.dialog=false;
          this.$emit('fetchImgs')
        })
        .catch((err) => err);
        }
    },
    props:{
        image: {
      type: Object,
    },
    }
  }
</script>
