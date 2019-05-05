import * as fb from 'firebase'

class User {
    constructor(id){
        this.id = id;
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
        }
    },
    actions: {
        /**
         * Отрефакторено для асинхронного запроса
         * @param commit метод
         * @param email - payload
         * @param password - payload
         * @returns {Promise<void>} возвращается промис
         */
        async registerUser({commit}, {email, password}){
            commit('clearError');//предварительно очищаем ошибки, перед запросом к серверу
            commit('setLoading', true);

            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password);
                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }

                /*.then(user => {
                    commit('setUser', new User(user.uid));
                    commit('setLoading', false);
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error.message);
                })*/
        },
        async loginUser({commit}, {email, password}){
            commit('clearError');//предварительно очищаем ошибки, перед запросом к серверу
            commit('setLoading', true);

            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password);
                commit('setUser', new User(user.uid));
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
        autoUpdateLogin({commit}, payload){
            commit('setUser', new User(payload.uid));
        },
        logoutUser({commit}){
            fb.auth().signOut();
            commit('setUser', null);
        }
    },
    getters: {
        user(state){
            return state.user;
        },
        isUserLoggedIn(state){
            return state.user !== null;
        }
    }
}