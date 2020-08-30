import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_result       : { restaurants:[] },
    categories          : [],
    selected_categories : [],
    cuisines            : [],
    selected_cuisines   : [],

    nav_overlay             : false
  },

  getters: {
    getSearchResult: state => {
      return state.search_result;
    },
    getCategories: state => {
      return state.categories;
    },
    getSelectedCategories: state => {
      return state.selected_categories.join();
    },
    getCuisines: state => {
      return state.cuisines;
    },
    getSelectedCuisines: state => {
      return state.selected_cuisines.join();
    },
    getNavOverlay: state => {
      return state.nav_overlay;
    },
  },

  actions: {
    fetchRestaurants( {commit},params ) {
      commit('setNavOverlay', true);

      axios.get('/search', params)
          .then(response => {
            commit('setRestaurants', response.data)
            commit('setNavOverlay', false)
          })
          .catch( error =>{
            console.log(error);
            commit('setNavOverlay', false)
          })
    },

    fetchCategories({commit}) {
      // if there is categories in the local storage use this
      if(localStorage.getItem('categories')) {
        try {
          // convert string to JS object
          commit('setCategories', JSON.parse(localStorage.getItem('categories')))
          return;
        } catch(e) {
          localStorage.removeItem('categories');
        }
      }

      axios.get('/categories')
          .then(response => {

            commit('setCategories', response.data.categories)

            let parsed = JSON.stringify(response.data.categories); // converts a JavaScript object or value to a JSON string
            localStorage.setItem('categories', parsed); // set categories in local storage

          })
          .catch( error =>{
            console.log(error);
          })
    },

    fetchCuisines( {commit}, params ) {
      // if there is categories in the local storage use this
      if(localStorage.getItem('cuisines')) {
        try {
          // convert string to JS object
          commit('setCuisines', JSON.parse(localStorage.getItem('cuisines')))
          return;
        } catch(e) {
          localStorage.removeItem('cuisines');
        }
      }

      axios.get('/cuisines', params)
          .then(response => {

            commit('setCuisines', response.data.cuisines)

            let parsed = JSON.stringify(response.data.cuisines); // converts a JavaScript object or value to a JSON string
            localStorage.setItem('cuisines', parsed); // set categories in local storage

          })
          .catch( error =>{
            console.log(error);
          })
    }
  },

  mutations: {
    setRestaurants (state, response) {
      state.search_result = response
    },

    setCategories(state, response) {
      state.categories = response
    },

    setSelectedCategories(state, val) {
      state.selected_categories = val
    },

    setCuisines(state, response) {
      state.cuisines = response
    },

    setSelectedCuisines(state, val) {
      state.selected_cuisines = val
    },

    setNavOverlay(state, val) {
      state.nav_overlay = val
    },

  },

/*  modules: {
  }*/

})
