import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                accent: '#50bebf',
            },
        },
    },
}

export default new Vuetify(opts);
