<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(item,i) in items"
                                :key="i"
                                :src="item.src"
                        >
                            <div class="carousel-link">
                                <v-btn :to="'/ads/'+item.id">{{ item.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg><!-- grid-list-lg задает сетку -->
            <v-layout row wrap><!-- для адаптивности нужен параметр wrap -->
                <v-flex xs12 sm6 md4 v-for="item of items" :key="item.id"><!-- xs12 sm6 md4 точки останова -->
                    <v-card>
                        <v-img
                                :src="item.src"
                                aspect-ratio="2.75"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ item.title }}</h3>
                                <div> {{ item.description }} </div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ads/'+item.id">Open</v-btn>
                            <v-btn raised class="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
    export default {
        name: "Home",
        data(){
            return {
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
                        promo: false,
                        src: require('./../assets/images/card-thumb-2.jpg'),
                        id: '2'
                    },
                    {
                        title: 'sdasd',
                        description: 'xzxczxc',
                        promo: false,
                        src: require('./../assets/images/card-thumb-3.jpg'),
                        id: '3'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
.carousel-link{
    position: absolute;
    top: 0;
    background: rgba(0,0,0, .5);
    padding: 20px;
    width: 100%;
    text-align: center;
}
.carousel-link > a{
    color: #ffffff;
}
</style>