<template>
  <v-container>
    <p class="subtitle-2 ml-1 mb-2">RATING</p>
    <v-row no-gutters>
      <v-range-slider
          tick-labels="012345"
          :value="[1, 4]"
          min="0"
          max="5"
          color="accent"
          track-color="gray"
      >
      </v-range-slider>
    </v-row>

    <p class="subtitle-2 ml-1 mb-2">COST</p>
    <v-row no-gutters>
      <v-range-slider
          :tick-labels="['$','$$','$$$', '$$$$']"
          :value="[1, 3]"
          min="0"
          max="3"
          color="accent"
          track-color="gray"
      >
      </v-range-slider>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Categories',

  data: () => ({

  }),

  computed: {
    ...mapGetters({
      categories: 'getCategories',
    }),

    selected_categories: {
      get () {
        return this.$store.state.selected_categories
      },
      set (val) {
        this.$store.commit('setSelectedCategories', val)
      }
    }
  },

  mounted () {
    //this.$store.dispatch('fetchCategories', {city_id: 297})
  }
}
</script>

<style>
</style>
