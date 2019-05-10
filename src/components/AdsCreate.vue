<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new Ad</h1>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field name="title" label="Title" type="text" v-model="title" :rules="[v => !!v || 'Title is required']"></v-text-field>
                    <!--<v-text-field name="description" label="Description" type="text" v-model="description" multi-line :rules="[v => !!v || 'Description is required']"></v-text-field>-->
                    <v-textarea name="description" label="Description" type="text" v-model="description" :rules="[v => !!v || 'Description is required']"></v-textarea>
                </v-form>
                <v-layout row mb-3>
                    <v-flex xs12>
                        <v-btn
                                color="blue-grey"
                                class="white--text"
                                @click="triggerUpload"
                        >
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input ref="fileInput" type="file" style="display: none;" accept="image/*" @change="selectFile">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img :src="src" v-if="src" alt="" width="150">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-checkbox
                                v-model="promo"
                                label="Ad to promo"
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn class="success" @click="createAd" :loading="loading" :disabled="!valid || !image || loading">Create</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        name: "AdsCreate",
        data(){
            return{
                title: '',
                description: '',
                promo: false,
                valid: false,
                image: null,
                src: ''
            }
        },
        computed: {
            /**
             * Установить лоадер на кнопку Create
             * @returns {*}
             */
            loading(){
                return this.$store.getters.loading;
            }
        },
        methods:{
            createAd(){
                if(this.$refs.form.validate() && this.image){
                    //Заполнить свойства объекта данными
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    };

                    /**
                     * Задиспатчить метод cerateItem и передать в него объект ad
                     */
                    this.$store.dispatch('createItem', ad)
                        .then(() => {
                            this.$router.push('/ads');//если нет ошибок, редирект на главную страницу
                        })
                        .catch(() => {});
                }
            },
            triggerUpload(){
                //триггер клика на скрытый input file
                this.$refs.fileInput.click();
            },
            selectFile(event){
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    this.src = reader.result;
                };
                reader.readAsDataURL(file);
                this.image = file;
            }
        }
    }
</script>

<style scoped>

</style>