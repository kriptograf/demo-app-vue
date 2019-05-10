import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from 'firebase'//подключение firebase от google в качестве сервиса
import dbCofig from './config/db'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  created(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: dbCofig.apiKey,
      authDomain: dbCofig.authDomain,
      databaseURL: dbCofig.databaseURL,
      projectId: dbCofig.projectId,
      storageBucket: dbCofig.storageBucket,
      messagingSenderId: dbCofig.messagingSenderId,
      appId: dbCofig.appId
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
