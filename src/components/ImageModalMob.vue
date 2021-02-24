<template>
  <v-dialog @click:outside="$emit('close')" v-if="dialog && image" :class="isMobile?'dialog_nor':'dialog_not_nor'"  v-model="dialog">
    
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
    name:'ImageModalMob',
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
    height: 41%;
    justify-content: center;
    pointer-events: none;
    position: fixed;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
    width: 100%;
    z-index: 6;
    outline: none;
}

</style>