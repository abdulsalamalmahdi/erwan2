<template>
  <v-dialog @click:outside="$emit('close')" v-if="dialog" :class="isMobile?'dialog_nor':'dialog_not_nor'"  v-model="dialog">
    
    <v-card>
      <v-img
        class="white--text align-end"
        :src="
          image.image_name.split('.')[1] === 'jpeg'
            ? require(`../../${image.url.replace('./', '')}`)
            : image.base64
        "
      >
        <v-card-title v-text="image.caption"></v-card-title>
      </v-img>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name:'ImageModal',
  data() {
    return {
    };
  },
  methods:{
   
  },
  mounted: function () {
    console.log(this.dialog);
    console.log(this.image);
    console.log(this.isMobile)
  },
  props: {
    dialog: {
      type: Boolean,
    },
    image: {
      type: Object,
    },
    isMobile: {
      type: Boolean,
    },
  },
  
};
</script>

<style scoped>

.v-dialog__content.v-dialog__content--active {
  align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 11%;
    pointer-events: none;
    position: fixed;
    top: 2%;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
    width: 67%;
    z-index: 6;
    outline: none;
}
.dialog_nor.v-dialog:not(.v-dialog--fullscreen) {
    
}
</style>