<template>
  <v-dialog :width="width" ref="dia" @click:outside="$emit('close')" v-if="dialog"  v-model="dialog">
    
    <v-card  height="100%">
      <NestedModal v-on="$listeners"  :image='image' v-if="isAdmin && !image.album"/>
      <v-img
      width="100%"
      height="100%"
      max-height="100%"
      max-width="100%"
      ref="image"
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
import NestedModal from "./NestedModal";
export default {
  name:'ImageModal',
  data() {
    return {
      loggedIn:null,
      newImage:{},
    };
  },
  
  mounted: function () {
   console.log('mounted')
  

  },
  methods:{
   
  },
  created:function(){
  
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
  computed:{
isAdmin(){
  return this.$store.getters.loggedIn;
},
width(){
  return this.newImage.height> this.newImage.width?"44%":"91%";
}

  },
  watch:{
image(){
  this.$nextTick(()=>{
    console.log(this.$refs.image)
 let imgNew= new Image()
  imgNew.src= this.$refs.image.src
   this.newImage= imgNew;
  
  })
}
  },
  components:{
    NestedModal,
  }
  
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
    width: 62%;
    z-index: 6;
    outline: none;
}
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}
</style>