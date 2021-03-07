import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1b264f',
                secondary: '#8591ff',
                accent: '#e36588',
                error: '#f44336',
                warning: '#ffc107',
                info: '#2196f3',
                success: '#8bc34a'
            }
        }
    }
});
