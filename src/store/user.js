import * as fb from 'firebase'

class User {
    constructor(id){
        this.id = id;
    }
}

export default {
    state: {
        uesr: null
    },
    mutations: {
        setUser(state, payload){
            state.uesr = payload;
        }
    },
    actions: {
        /**
         * Отрефакторено для асинхронного запроса
         * @param commit
         * @param email
         * @param password
         * @returns {Promise<void>}
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
        }
    },
    getters: {
        user(state){
            return state.uesr;
        }
    }
}