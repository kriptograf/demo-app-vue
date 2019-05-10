<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(item,i) in promoItems"
                                :key="i"
                                :src="item.src"
                        >
                            <div class="carousel-link">
                                <a v-bind:href="'/ads/'+item.id" class="promo-link">{{ item.title }}</a>
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
    <div v-else>
        <v-layout row>
            <v-flex xs12 class="text-xs-center pt-5">
                <v-progress-circular
                        :size="170"
                        :width="7"
                        color="purple"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            /**
             * Получаем данные из Store
             * @returns {*}
             */
            promoItems(){
                //Эти данные выводить в карусели
                return this.$store.getters.promoItems;
            },
            items(){
                //Эти данные выводить в гриде объявлений
                return this.$store.getters.items;
            },
            loading(){
                return this.$store.getters.loading;
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
    .promo-link{
        font-size: 1.3em;
        font-weight: bold;
        color: #ffffff;
        text-decoration: none;
        text-transform: uppercase;
    }
</style>