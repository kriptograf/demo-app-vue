import store from '../store'

/**
 * Защищаем роуты от несанкционированного доступа
 * @param to
 * @param from
 * @param next
 */
export default function (to, from, next) {
    if (store.getters.user) {
        next();
    }else {
        next('/login');
    }
}