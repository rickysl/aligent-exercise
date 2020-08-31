<template>
  <v-container>
    <p class="subtitle-2 ml-1 mb-2">CUISINE</p>

    <template v-if="cuisines.length > 1">
      <v-row no-gutters style="height: 150px; overflow: auto;">
        <template v-for="(item,i) in cuisines">
          <v-col md="3" :key="i"><v-checkbox v-model="selected_cuisines" :value="item.cuisine.cuisine_id" :label="item.cuisine.cuisine_name" hide-details dense color="accent"></v-checkbox></v-col>
        </template>
      </v-row>
    </template>

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
      cuisines: 'getCuisines',
    }),

    selected_cuisines: {
      get () {
        return this.$store.state.selected_cuisines
      },
      set (val) {
        this.$store.commit('setSelectedCuisines', val)
      }
    }
  },

  mounted () {
    let params = { params:{ city_id:297 } }
    this.$store.dispatch('fetchCuisines', params)
  }
}
</script>

<style>
.v-input--checkbox .v-label{font-size: .75rem!important;    font-weight: 500;
  }
</style>
