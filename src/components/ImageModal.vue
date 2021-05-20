<template>
  <v-dialog height="100%" width="100%" ref="dia" @click:outside="$emit('close')" v-if="dialog"  v-model="dialog">
    
    <v-card  height="100%">
      <NestedModal v-on="$listeners"  :image='image' v-if="isAdmin && !image.album"/>
      <v-img
      
      max-height="100%"
      max-width="100%"
      ref="image"
        class="white--text align-end"
        :src="require(`../../${image.url}`)"
      >
   {{log(image)}}
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
  created: function(){
    console.log('imagemodal created')
  },
  mounted: function () {
   console.log('mounted')
  
console.log(this);

  },
  methods:{
   log(msg){
console.log(msg)
   }
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
  return this.newImage.height> this.newImage.width?"44%":"51%";
},
height(){
  return this.newImage.height> 1000?"1000px":"800px";
}

  },
  watch:{
image(){
  this.$nextTick(()=>{
   
 let imgNew= new Image()
  // imgNew.src= this.$refs.image.src
  imgNew.src= this.image.url
   this.newImage= imgNew;
 
  
  })
}
  },
  components:{
   NestedModal,
  }
  
};
</script>

<style lang="scss" scoped>

.v-dialog__content.v-dialog__content--active {
  align-items: center;
    display: flex;
    height: fit-content;
    justify-content: center;
    left: 19%;
    pointer-events: none;
    position: fixed;
    top: 10%;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
    width: fit-content;
    z-index: 6;
    outline: none;

}
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
   
  width: fit-content;
  height: fit-content;

}
.v-image{
  

    height: 567px;
    max-height: 100%;
    max-width: 100%;
    width: 800px;
    /* left: 0%; */

}
.v-image__image{

}
</style>