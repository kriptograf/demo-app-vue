import * as fb from 'firebase'

class Ad {
    constructor(title, description, ownerId, src = '', promo = false, id = null){
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.src = src;
        this.promo = promo;
        this.id = id;
    }
}

export default {
    state: {
        items: [
            {
                title: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet',
                promo: false,
                src: require('./../assets/images/card-thumb-1.jpg'),//для подключения локальных изображений использовать require
                id: '1'
            },
            {
                title: 'rewe',
                description: 'dfgsdfg',
                promo: true,
                src: require('./../assets/images/card-thumb-2.jpg'),
                id: '2'
            },
            {
                title: 'sdasd',
                description: 'xzxczxc',
                promo: true,
                src: require('./../assets/images/card-thumb-3.jpg'),
                id: '3'
            }
        ]
    },
    mutations: {
        createItem(state, payload){
            //добавить новый объект в хранилище
            state.items.push(payload);
        }
    },
    actions: {
        async createItem({commit, getters}, payload){

            commit('clearError');
            commit('setLoading', true);
            
            try {
                /**
                 * Проинициализировать объект данными
                 * @type {Ad}
                 */
                const newItem = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    payload.src,
                    payload.promo
                );

                /**
                 * Сохранить данные в базу firebase
                 */
                const fbVal = await fb.database().ref('ads').push(newItem);

                //остановить лоадер
                commit('setLoading', false);

                /**
                 * Добавить новую запись в state
                 */
                commit('createItem', {
                    ...newItem,//декомпозиция объекта
                    id: fbVal.key //присвоить объявлению полученный id
                });

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
            
            //коммит мутации
            //commit('createItem', payload);
        }
    },
    getters: {
        items(state){
            //геттер будет работать для всех объявлений
            return state.items;
        },
        promoItems(state){
            //Возвращает только те объявления где promo true
            return state.items.filter(item => {
                return item.promo;
            });
        },
        myItems(state){
            //геттер заглушка, будет возвращать свои объявления для пользователя
            return state.items;
        },
        itemById(state){
            //Найти в массиве item у которого id равен переданному параметру id
            return adId => {
                return state.items.find(item => item.id === adId);
            }
        }
    }
}