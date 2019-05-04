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

    },
    actions: {

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
        }
    }
}