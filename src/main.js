import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'//подключение firebase от google в качестве сервиса

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  created(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBAma6Az4_e0aXYZIKRXNk7vJfz87XDEtc",
      authDomain: "learning-vue-78899.firebaseapp.com",
      databaseURL: "https://learning-vue-78899.firebaseio.com",
      projectId: "learning-vue-78899",
      storageBucket: "learning-vue-78899.appspot.com",
      messagingSenderId: "776143866532",
      appId: "1:776143866532:web:1e3805fbc5699d98"
    };

    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
        if(user){
            this.$store.dispatch('autoUpdateLogin', user);
        }
    });

    /**
     * Вызвать метод хранилища для получения всех объявлений из бд
     */
    this.$store.dispatch('fetchAds');
  }
}).$mount('#app')
