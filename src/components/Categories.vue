<template>
  <v-container>
    <p class="subtitle-2 ml-1 mb-2">CATEGORY</p>

    <template v-if="categories.length > 1">
      <v-row no-gutters>
        <template v-for="(item,i) in categories">
          <v-col md="4" :key="i"><v-checkbox v-model="selected_categories" :value="item.categories.id" :label="item.categories.name" hide-details dense color="accent"></v-checkbox></v-col>
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
    this.$store.dispatch('fetchCategories', {city_id: 297})
  }
}
</script>

<style>
.v-input--checkbox .v-label{font-size: .75rem!important;    font-weight: 500;
  }
</style>
