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

        ]
    },
    mutations: {
        createItem(state, payload){
            //добавить новый объект в хранилище
            state.items.push(payload);
        },
        loadAds(state, payload){
            //присваиваем массиву items, сформированный payload
            state.items = payload;
        }
    },
    actions: {
        async createItem({commit, getters}, payload){

            commit('clearError');
            commit('setLoading', true);

            const image = payload.image;
            
            try {
                /**
                 * Проинициализировать объект данными
                 * @type {Ad}
                 */
                const newItem = new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id,
                    '',
                    payload.promo
                );

                /**
                 * Сохранить данные в базу firebase
                 */
                const fbVal = await fb.database().ref('ads').push(newItem);

                const imageExt = image.name.slice(image.name.lastIndexOf('.'));

                /**
                 * Сохранить изображение на сервере и вернуть его src- полнй путь к изображению
                 * @type {any}
                 */
                const fileData = await fb.storage().ref(`ads/${fbVal.key}${imageExt}`).put(image)
                    .then(uploadTaskSnapshot => {
                        return uploadTaskSnapshot.ref.getDownloadURL();
                    });

                /**
                 * После получения пути к изображению, обновить его в базе данных
                 * Не очень логично получается, два запроса к бд o_O
                 */
                await fb.database().ref('ads').child(fbVal.key).update({
                    src: fileData
                });

                //остановить лоадер
                commit('setLoading', false);

                /**
                 * Добавить новую запись в state
                 */
                commit('createItem', {
                    ...newItem,//декомпозиция объекта
                    id: fbVal.key, //присвоить объявлению полученный id
                    src: fileData //Установить путь к изображению
                });

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
            
            //коммит мутации
            //commit('createItem', payload);
        },
        async fetchAds({commit}){
            commit('clearError');
            commit('setLoading', true);

            const resultAds = [];

            try {
                /**
                 * Обратиться к базе данных и запросить все данные из таблицы ads
                 */
                const fbVal = await fb.database().ref('ads').once('value');
                /**
                 * Вызвать специальный метод val у объекта который возвращает firebase
                 * @type {any}
                 */
                const ads = fbVal.val();

                /**
                 * Перебрать все объявления и заполнить результирующий массив, данными
                 */
                Object.keys(ads).forEach(key => {
                    const ad = ads[key];
                    resultAds.push(new Ad(
                        ad.title,
                        ad.description,
                        ad.ownerId,
                        ad.src,
                        ad.promo,
                        key
                    ));
                });

                /**
                 * Вызвать метод loadAds и передать в него сформированный массив
                 */
                commit('loadAds', resultAds);
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
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