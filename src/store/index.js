import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_result: { restaurants:[] },
  },

  getters: {
    getSearchResult: state => {
      return state.search_result;
    }
  },

  actions: {
    fetchRestaurants( {commit},params ) {
      axios.get('/search', params)
          .then(response => {
            commit('setRestaurants', response.data)
          })
          .catch( error =>{
            console.log(error);
          })
    }
  },

  mutations: {
    setRestaurants (state, response) {
      state.search_result = response
    }
  },

/*  modules: {
  }*/

})
