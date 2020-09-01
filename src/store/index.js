import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_start        : 0,
    categories          : [],
    cuisines            : [],

    selected_categories : [],
    selected_cuisines   : [],
    selected_restaurant : null,
  },

  getters: {
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
    getSelectedRestaurant: state => {
      return state.selected_restaurant;
    },
  },

  actions: {
    fetchRestaurants( {commit},params ) {
      return new Promise((resolve, reject) => {
        axios.get('/search', params)
            .then(response => {

              resolve(response);
              commit('setSearchStart', params.params.start)

              if(response.data.restaurants.length > 0){
                commit('setSelectedRestaurants', response.data.restaurants[0])
              }
              else{
                commit('setSelectedRestaurants', null)
              }

            })
            .catch( error =>{
              reject(error);
              console.log(error);
            })
      });
    },

    fetchMoreRestaurants( {commit}, params ) {

      return new Promise((resolve, reject) => {
        axios.get('/search', params)
            .then(response => {

              resolve(response);
              commit('setSearchStart', params.params.start)

            })
            .catch( error =>{
              reject(error);
              console.log(error);
            })
      });
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

    setSelectedRestaurants(state, val) {
      state.selected_restaurant = val
    },

    setSearchStart(state, val) {
      state.search_start = val
    },

  },

/*  modules: {
  }*/

})
