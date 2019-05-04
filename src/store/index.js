import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'//импортровать модуль

/**
 * Использовать компонент Vuex в качестве хранилища
 */
Vue.use(Vuex);

/**
 * Экспортировать объект Store
 */
export default new Vuex.Store({
    modules: {
        ads
    }
});