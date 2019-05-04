<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-media :src="ad.src" height="300px"></v-card-media>
                    <v-card-text>
                        <h1 class="text--primary">{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="warning">Edit</v-btn>
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AdsDetail",
        props: ['id'],//в роутере установить параметр в true и здесь получать параметр id из url
        computed: {
            ad(){
                const id = this.id;
                //Получить из хранилища объявление по id
                return this.$store.getters.itemById(id);
            }
        }
    }
</script>

<style scoped>

</style>