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
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="item of items" :key="item.id">
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
                            <v-btn flat color="orange">Share</v-btn>
                            <v-btn flat color="orange">Explore</v-btn>
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
                        src: require('./../assets/images/card-thumb-1.jpg'),
                        id: '1'
                    },
                    {
                        title: 'rewe',
                        description: 'dfgsdfg',
                        promo: false,
                        src: require('./../assets/images/card-thumb-2.jpg'),
                        id: '1'
                    },
                    {
                        title: 'sdasd',
                        description: 'xzxczxc',
                        promo: false,
                        src: require('./../assets/images/card-thumb-3.jpg'),
                        id: '1'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>