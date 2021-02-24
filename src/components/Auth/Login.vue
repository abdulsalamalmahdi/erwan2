<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
     
      <v-card width="300" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="dispaly-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            label="email"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="password"
            v-model="password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
          <v-row>
              <v-col>
                  <v-btn @click.prevent="submit" color="info">Login</v-btn>
              </v-col>
               <v-spacer></v-spacer>
               <v-col>
                    <v-btn @click.prevent="cancel" color="red">Cancel</v-btn>
               </v-col>
       
          </v-row>
       
      </v-card-actions>
      
    </v-card>
    <v-card v-if="serverError">
      <v-alert class="alert" color="red" type="error">
        {{ serverError }}</v-alert
      >
    </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      serverError: "",
      loading: false,
    };
  },
  mounted:function(){
      this.dialog =this.$store.getters.getLogin
      console.log(this.dialog)
  },
  methods: {
   submit() {
      const email = this.email;
      const password = this.password;
      const opts = {
        email,
        password,
      };
      console.log(opts)
      this.$store
        .dispatch("retrieveToken", {email,password})
        .then((res) => {
         console.log("logging");
          if (res.status === 200) {
             
            this.loading = false, 
           this.$store.dispatch("logIn_action",{login:false})
            this.$router.push("/admin/album_add");
          }
        })
        .catch((err) => {
          console.log(err)
          // this.loading = false;
          // this.serverError = err.response.data;
          // this.successMessage = "";
        });
    },
    cancel(){
    this.$store.dispatch("logIn_action",{login:false})
    }
  },
  computed:{
      dialog(){
          return this.$store.getters.getLogin
      }
  }
};
</script>
<style scoped>
.alert {
  margin: 3rem;
  width: 25rem;
  align-self: center;
}
</style>