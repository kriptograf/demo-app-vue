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
        createItem({commit}, payload){
            //Временно установить случайный id, в дальнейшем получать его с сервера
            payload.id = '123456';//Внимание! id принимает только строку
            //коммит мутации
            commit('createItem', payload);
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