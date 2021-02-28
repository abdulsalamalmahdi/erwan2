import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "/api";
const state = {
  user: {},
  albums:[],
  images: [],
  token: localStorage.getItem("user_token") || null,
  status: "",
  login:false,
};
const getters = {
  getLogin:(state)=>{
    return state.login
  },
  getUser: (state) => {
   
    return state.user;
  },
  getUsers: (state) => {
    return state.users;
  },
  loggedIn: (state) => {
    console.log(!!state.token)
    return !!state.token},
  getMsgs: (state) => {
  // console.log(state.messages)
    return state.messages;
  },
};

const actions = {

  logIn_action({commit}, opts){
   
commit('login_mutation',opts)
  },
  logout_action({commit}){
   
    commit('logout_mutation')
      },
  retrieveToken({ commit, state},opts) {
     //console.log(opts)
    return new Promise( (resolve, reject) => {
     
      axios
        .post("/login", opts)
        .then( (res) => {
          console.log(res)
          const token = res.data.token;
          const _id = res.data.user._id;
         // console.log(res.data.user._id);
          localStorage.setItem("user_token", token);
          localStorage.setItem("_id", _id);
         
            setTimeout(()=>{
              localStorage.removeItem('user_token');
              localStorage.removeItem('_id')
            }, 3600000);
         
           commit("retrieveToken", token);
           console.log(state.user._d);
           
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
 
  
  setImageAction({ commit }, image) {
    console.log("image action");
    commit({
      type: "setImage",
      image,
    });
  },
  set_auth_status_action({ commit }) {
    let auth_status = JSON.parse(localStorage.getItem("user_token"));

    commit({
      type: "set_auth_status",
      auth_status,
    });
  },
};

const mutations = {
  login_mutation(state, opts){
    console.log(opts)
    state.login = opts.login
   
  },
  logout_mutation(state){
  state.token='';
  localStorage.removeItem("user_token");
   
  },

  retrieveToken(state, token) {
    state.token = token;
  },
  
  setImage(state, image) {
    //console.log("setting " + image);
    state.authenticatedUser = { image };
  },
  removeUser(state) {
    localStorage.removeItem('user_token');
    localStorage.removeItem('_id');
     state.token = '';

    
  },
  set_auth_status(state, auth_status) {
    state.authStatus = auth_status;
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});