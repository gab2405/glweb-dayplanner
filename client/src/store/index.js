import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    user: {
      _id: '',
      name: '',
      local: {}
    },
    notification: {
      status: 'success',
      msg: ''
    }
  },
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  mutations: {
    getAuth(state, payload) {
      state.auth = payload;
    },
    getUser(state, payload) {
      state.user = payload
    },
    setNotification(state, payload){
      state.notification = payload;
      setTimeout(() => state.notification = {
          status: '',
          msg: ''
        } ,2000)
    }
  },
  actions: {},
  modules: {}
})