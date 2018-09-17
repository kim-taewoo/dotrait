import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

console.log(colors)
Vue.use(Vuetify, {
  theme: {
    primary: "#1976D2", // a color that is not in the material colors palette
    secondary: colors.grey.darken1,
    info: "#2196F3",
    accent: "#82B1FF",
    warning: "#FFC107",
    error: "#FF5252",
    success: "#4CAF50",
    dumb: '#121212'
  }
})

Vue.use(VueAwesomeSwiper)
